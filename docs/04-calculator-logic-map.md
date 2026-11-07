# Calculator Logic Map & Engineering Contract

## 1. Prototype Architecture (`src/lib/calculator-engine.ts`)
The calculator is architected with a strict separation between **React UI State (`MortgageCalculator.tsx`)** and the **Pure Mathematical Engine (`calculator-engine.ts`)**.

### Input State Contract (`CalculatorInputs`)
| Variable | Key | Prototype Range | Default Value | UI Control |
| :--- | :--- | :--- | :--- | :--- |
| Home Purchase Price | `homePrice` | `$100,000` – `$2,500,000` | `$485,000` | Range Slider + Currency Input |
| Down Payment ($) | `downPaymentAmount` | `$0` – `90% of price` | `$97,000` | Synchronized with % |
| Down Payment (%) | `downPaymentPercent` | `0%` – `90%` | `20%` | Range Slider + Quick Preset Pills (`3.5%`, `5%`, `10%`, `20%`) |
| Interest Rate (%) | `interestRate` | `2.50%` – `10.00%` | `6.25%` | Range Slider (`0.125%` step) + Numeric Input |
| Loan Term (Years) | `loanTermYears` | `10`, `15`, `20`, `30` | `30` | Segmented Button Bar |
| Annual Property Tax (%) | `propertyTaxRate` | `0.20%` – `3.50%` | `1.15%` | Range Slider / Advanced Drawer |
| Annual Home Insurance ($) | `annualInsurance` | `$400` – `$10,000` | `$1,680` | Range Slider / Advanced Drawer |
| Monthly HOA ($/mo) | `monthlyHoa` | `$0` – `$1,500` | `$0` | Numeric Input / Slider |
| Credit Score Tier | `creditTier` | `760+`, `720-759`, `680-719`, `640-679` | `760+` | Selector (adjusts PMI factor when LTV > 80%) |

### Output State Contract (`CalculatorOutputs`)
- `principalAndInterest`: Standard amortization formula $M = P \frac{r(1+r)^n}{(1+r)^n - 1}$
- `monthlyPropertyTax`: `(homePrice * (propertyTaxRate / 100)) / 12`
- `monthlyInsurance`: `annualInsurance / 12`
- `monthlyPmi`: Automatically calculated when `LTV > 80%` based on `creditTier` PMI factor; `$0` when `LTV <= 80%`.
- `monthlyHoa`: Direct pass-through.
- `totalMonthlyPayment`: Sum of P&I + Tax + Insurance + PMI + HOA.
- `loanAmount`: `homePrice - downPaymentAmount`
- `ltvPercent`: `(loanAmount / homePrice) * 100`
- `totalInterestOverLife`: `(principalAndInterest * totalMonths) - loanAmount`

## 2. Epic 5 Transition: Swapping in Robert's Excel Workbook
Once Robert provides his custom Excel workbook during Epic 1:
1. Map named cells/formulas from the `.xlsx` sheet directly into `calculateMortgageScenario(inputs)` inside `src/lib/calculator-engine.ts`.
2. Add a Jest/Vitest table test comparing 10 sample rows from Robert's Excel sheet against `calculateMortgageScenario()` for cent-for-cent parity.

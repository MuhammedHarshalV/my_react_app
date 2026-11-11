import ExpenseCard from "../../components/expenses/ExpenseCard";
import { useLocation } from "react-router-dom";
export default function ExpensesPage(
) {
    const location = useLocation();
    const {
        employeeName = "",
        startDate = "",
        endDate = "",
        filter = "",
    } = location.state || {};
    return <ExpenseCard employeeName={employeeName}
        startDate={startDate}
        endDate={endDate}
        filter={filter} />;
}
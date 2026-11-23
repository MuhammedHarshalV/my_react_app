
import HistoricalAudit from "../../components/history/HistoricalAudit";

import CategoryAnalytics from "../../components/history/CategoryAnalytics";
function HistoryPage() {
    return (
        <div >
            <HistoricalAudit />
            <div style={{ height: 24 }} />

            <CategoryAnalytics />
        </div>

    );
}

export default HistoryPage;
import ClinicDetails from "../../components/clinic/ClinicDetails";

import { useLocation } from "react-router-dom";


export default function ClinicsPage() {

    const location = useLocation();

    const {
        employeeName = "",
        startDate = "",
        endDate = "",
    } = location.state || {};

    return (
        <ClinicDetails
            employeeName={employeeName}
            startDate={startDate}
            endDate={endDate}
        />
    );
}
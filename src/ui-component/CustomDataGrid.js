import { DataGridPro } from "@mui/x-data-grid-pro";
import { LicenseInfo } from '@mui/x-license';

const CustomDataGrid = (props) => {
  LicenseInfo.setLicenseKey(
    '3a606f3b91b5cf1775c14b184cacd867Tz03NTMyNCxFPTE3MjcxMDQzOTEwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI='
  );
  return <DataGridPro {...props} />;
};

export default CustomDataGrid;

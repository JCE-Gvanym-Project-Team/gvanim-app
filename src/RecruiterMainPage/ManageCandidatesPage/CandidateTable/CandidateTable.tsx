import { Description } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  SxProps,
  Theme,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaders,
  GridRow,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  gridClasses,
  gridPageCountSelector,
  gridPageSelector,
  heIL,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyLoading from "../../../Components/MyLoading/MyLoading";
import { getFilteredCandidates } from "../../../Firebase/FirebaseFunctions/Candidate";
import { getFilteredCandidateJobStatuses } from "../../../Firebase/FirebaseFunctions/CandidateJobStatus";
import { getFilteredJobs } from "../../../Firebase/FirebaseFunctions/Job";
import DropMenu from "../DropMenu/DropMenu";
import MyChip from "../ViewCandidatesPage/Components/MyChip/MyChip";
import { MyButtonSx } from "./CandidateTableStyle";
import EventIcon from "@mui/icons-material/Event";

// -------------------Use Memorie for better performance----------------------------------------------------
const TraceUpdates = React.forwardRef<any, any>((props, ref) => {
  const { Component, ...other } = props;
  const rootRef = React.useRef<HTMLElement>();
  const handleRef = useForkRef(rootRef, ref);

  React.useEffect(() => {
    const root = rootRef.current;
    root!.classList.add("updating");
    root!.classList.add("updated");

    const timer = setTimeout(() => {
      root!.classList.remove("updating");
    }, 360);

    return () => {
      clearTimeout(timer);
    };
  });

  return <Component ref={handleRef} {...other} />;
});

const RowWithTracer = React.forwardRef((props, ref) => {
  return <TraceUpdates ref={ref} Component={GridRow} {...props} />;
});

const ColumnHeadersWithTracer = React.forwardRef((props, ref) => {
  return <TraceUpdates ref={ref} Component={GridColumnHeaders} {...props} />;
});

const MemoizedRow = React.memo(RowWithTracer);
const MemoizedColumnHeaders = React.memo(ColumnHeadersWithTracer);
// ---------------------------------------------------------------------------------------------------------

const ODD_OPACITY = 0.2;
const MyDataGrid = (theme: Theme): SxProps => ({
  paddingTop: 1,
  height: "618px",
  borderTop: "1px solid rgba(0, 0, 0, 0.125)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.125)",
  borderRight: "unset",
  borderLeft: "unset",
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
  overflow: "hidden",
  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "&.MuiDataGrid-root .MuiDataGrid-row:focus-within": {
    background: alpha(
      theme.palette.primary.main,
      ODD_OPACITY + theme.palette.action.selectedOpacity
    ),
  },

  color:
    theme.palette.mode === "light"
      ? "rgba(0,0,0,.85)"
      : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-cell": {
    color:
      theme.palette.mode === "light"
        ? "rgba(0,0,0,.85)"
        : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: "35%",
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[50],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
});

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>אין מועמדים!</Box>
    </StyledGridOverlay>
  );
}
//================================================

const columns: GridColDef[] = [
  {
    field: "options",
    headerName: "",
    width: 50,
    hideSortIcons: true,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    disableExport: true,
    editable: false,
    align: "center",

    renderCell: (candidate) => {
      return <DropMenu CandidateId={candidate?.row} />;
    },
  },
  {
    field: "firstName",
    headerName: "שם פרטי",
    width: 150,
    headerAlign: "center",
    align: "center",
    sortable: true,
    sortComparator: (_v1, _v2, params1, params2) =>
      params1.api
        .getCellValue(params1.id, "firstName")
        .localeCompare(params2.api.getCellValue(params2.id, "firstName")),
    valueGetter: (params) => params.row._firstName,
  },
  {
    field: "_lastName",
    headerName: "שם משפחה",
    width: 150,
    headerAlign: "center",
    align: "center",
    sortable: true,
    sortComparator: (_v1, _v2, params1, params2) =>
      params1.api
        .getCellValue(params1.id, "_lastName")
        .localeCompare(params2.api.getCellValue(params2.id, "_lastName")),
    valueGetter: (params) => params.row._lastName,
  },
  {
    field: "_jobNumbers",
    headerName: "מספר המשרה ",
    width: 150,
    headerAlign: "center",
    align: "center",
    sortable: false,
    renderCell: (params) => {
      const jobNumbers = params.value as number[];

      let displayJobNumbers = jobNumbers;
      if (jobNumbers.length > 2) {
        displayJobNumbers = jobNumbers.slice(0, 2);
        displayJobNumbers.push(-1); // Add a placeholder number to indicate ellipsis
      }

      const formattedJobNumbers = displayJobNumbers
        .map((jobNumber) => (jobNumber === -1 ? "..." : jobNumber))
        .join(", ");

      return <span>{formattedJobNumbers}</span>;
    },
  },
  {
    field: "_jobArea",
    headerName: "אזור",
    width: 150,
    headerAlign: "center",
    align: "center",
    sortable: true,
    sortComparator: (_v1, _v2, params1, params2) =>
      params1.api
        .getCellValue(params1.id, "_jobArea")
        .localeCompare(params2.api.getCellValue(params2.id, "_jobArea")),
    valueGetter: (params) => params.row._region,
  },
  {
    field: "_applyDate",
    headerName: "תאריך הגשת מועמדות",
    width: 200,
    headerAlign: "center",
    align: "center",
    sortable: true,
    sortComparator: (v1, v2, _cellParams1, _cellParams2) => {
      const date1 = new Date(v1);
      const date2 = new Date(v2);
      return date1.getTime() - date2.getTime();
    },
    valueGetter: (params) => params.row._applyDate,
    renderCell: (params) => {
      const submissionDate = new Date(params.value);
      const formattedDate = submissionDate.toLocaleDateString("he-IL", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EventIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={formattedDate} />
        </ListItem>
      );
    },
  },
  {
    field: "status",
    headerName: "סטטוס המועמד",
    width: 150,
    headerAlign: "center",
    align: "center",
    sortable: true,
    renderCell: (params) => {
      const jobId = params.row?._jobNumber.toString();
      const candidate = params.row;
      return <MyChip jobId={jobId} candidate={candidate} purpose="status" />;
    },
  },
  {
    field: "cvFile",
    headerName: "קורות חיים",
    width: 150,
    headerAlign: "center",
    align: "center",
    sortable: false,
    renderCell: (params) => {
      return <CvButton candidate={params.row} />;
    },
  },
];

const CvButton = ({ candidate }) => {
  const [loading, setLoading] = useState(false);

  const handleCvClick = async () => {
    setLoading(true);
    const cvLink = await candidate.getCvUrl();
    setLoading(false);
    window.open(cvLink);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        sx={{ color: "white", backgroundColor: "#448aff" }}
        variant="contained"
        startIcon={<Description />}
        onClick={handleCvClick}
        disabled={loading}
      >
        קו"ח
      </Button>
    </Box>
  );
};

const GridCustomToolbar = () => {
  const navigate = useNavigate();

  const handleCreateCandidate = () => {
    navigate("/management/createCandidate", { state: null });
  };

  return (
    <GridToolbarContainer>
      <Stack direction="row" sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <GridToolbarQuickFilter
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              "& .muirtl-2ehmn7-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(0, 0, 0, 0.23)",
                },
              "& .muirtl-ptiqhd-MuiSvgIcon-root": {
                color: "rgba(0, 0, 0, 0.23)",
              },
            }}
          />
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row-reverse", width: "100%" }}
        >
          <Box>
            <Button
              onClick={handleCreateCandidate}
              disableRipple
              sx={MyButtonSx}
            >
              <Typography
                sx={{
                  font: "12px Roboto, Helvetica,Arial, sans-serif",
                  margin: "0px 0px 2px 0px",
                  fontWeight: 600,
                }}
              >
                מועמד/ת חדש/ה
              </Typography>
            </Button>
          </Box>
        </Box>
      </Stack>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottomColor: "rgba(224, 224, 224, 1)",
        }}
      >
        <Box>
          <GridToolbarFilterButton />
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
        </Box>
      </Box>
    </GridToolbarContainer>
  );
};

const CustomPaginationAndFooter = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const rowsCount = apiRef.current.getRowsCount();

  return (
    <Stack
      direction={{
        xs: "column",
        sm: "column",
        md: "column",
        lg: "row-reverse",
        xl: "row-reverse",
      }}
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      padding={1}
    >
      <Box>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page + 1}
          count={pageCount}
          // @ts-expect-error
          renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
          onChange={(_event: React.ChangeEvent<unknown>, value: number) =>
            apiRef.current.setPage(value - 1)
          }
        />
      </Box>

      <Box>
        <Chip
          label={rowsCount + " מועמדים"}
          sx={{ fontWeight: "bold", borderRadius: "0.5rem", color: "black" }}
          variant="outlined"
        />
      </Box>
    </Stack>
  );
};

export default function CandidateTable() {
  const [pageloading, setPageLoading] = React.useState(true);
  const [dataloading, setDataLoading] = React.useState(true);
  type CombinedCandidate = {
    _id: string;
    _firstName: string;
    _lastName: string;
    _phone: string;
    _eMail: string;
    _generalRating: number;
    _jobNumber: number;
    _status: string;
    _applyDate: Date;
    _region: string;
  };

  const [rows, setRows] = React.useState<CombinedCandidate[]>([]);
  const navigate = useNavigate();

  const fetchAllData = async () => {
    setDataLoading(true);

    // Fetch all necessary data.
    const candidates = await getFilteredCandidates();
    const candidateJobStatuses = await getFilteredCandidateJobStatuses(); // Assuming this function retrieves the candidate's job statuses
    const jobs = await getFilteredJobs();

    // Combine data into a new array for the rows.
    const combinedRows = candidates
      .filter((candidate) => candidate._firstName && candidate._lastName)
      .map((candidate) => {
        // Find the job statuses for the current candidate.
        const jobStatuses = candidateJobStatuses.filter(
          (status) => status._candidateId === candidate._id
        );

        if (jobStatuses.length === 0) {
          // Candidate has no job statuses
          return null;
        }

        // Sort job statuses by apply date in descending order
        jobStatuses.sort(
          (a, b) =>
            new Date(b._applyDate).getTime() - new Date(a._applyDate).getTime()
        );

        const lastJobStatus = jobStatuses[0];
        const jobNumber = lastJobStatus._jobNumber;

        // Find the job associated with the last job status.
        const associatedJob = jobs.find((job) => job._jobNumber === jobNumber);

        if (!associatedJob) {
          // Last job status does not have a corresponding job
          return null;
        }

        // Check if the apply date belongs to the specific candidate and the specific job
        if (
          lastJobStatus._applyDate &&
          lastJobStatus._candidateId === candidate._id &&
          lastJobStatus._jobNumber === jobNumber
        ) {
          return {
            ...candidate,
            _jobNumber: jobNumber,
            _status: lastJobStatus._status,
            _applyDate: lastJobStatus._applyDate,
            _region: associatedJob._region,
            _jobNumbers: jobStatuses.map((status) => status._jobNumber),
            getCvUrl: candidate.getCvUrl,
          };
        }

        return null;
      }) as (CombinedCandidate | null)[];

    const filteredRows = combinedRows.filter(
      (row) => row !== null
    ) as CombinedCandidate[];

    setRows(filteredRows);

    setDataLoading(false);
  };

  React.useEffect(() => {
    setPageLoading(false);
    fetchAllData();
  }, []);

  const theme = useTheme();

  return (
    <>
      {pageloading ? (
        <MyLoading loading={pageloading} setLoading={setPageLoading} />
      ) : (
        <>
          <DataGrid
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            autoPageSize
            sx={MyDataGrid(theme)}
            rows={rows}
            columns={columns}
            onRowDoubleClick={(candidate) =>
              navigate(`/management/manageCandidates/${candidate.id}`)
            }
            hideFooterSelectedRowCount
            rowCount={rows.length}
            getRowId={(row) => row._id}
            localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
            loading={dataloading}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              toolbar: GridCustomToolbar,
              footer: CustomPaginationAndFooter,
              loadingOverlay: LinearProgress,
              row: MemoizedRow,
              columnHeaders: MemoizedColumnHeaders,
            }}
          />
        </>
      )}
    </>
  );
}

import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Switch,
  TextField,
  TextareaAutosize,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  BoxGradientSx,
  MyLabelSx,
  MyPaperSx,
  MyTextFieldSx,
  SwitchPaperSx,
} from "./NewCandidatePageStyle";
import JobScopeSlider from "./Components/ScopeSlider/ScopeSlider";
import {
  Job,
  generateJobNumber,
  getFilteredJobs,
} from "../../../Firebase/FirebaseFunctions/Job";
import { useLocation, useNavigate } from "react-router-dom";
import "./NewCandidatePage.css";
import { ArticleOutlined } from "@mui/icons-material";
import MyLoading from "../../../Components/MyLoading/MyLoading";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { designReturnButton } from "../ManageCandidatesPageStyle";
import {
  Candidate,
  generateCandidateId,
  getFilteredCandidates,
} from "../../../Firebase/FirebaseFunctions/Candidate";
import PhoneNumberSelection from "./Components/PhoneSingleSelection/PhoneSingleSelection";
import EmailInput from "./Components/emailSingleSelection/EmailSelection";
import RemoveCandidateDialog from "./Components/RemoveCandidateDialog/RemoveCandidateDialog";
import {
  jobTextSx,
  mainStackSx,
} from "../ViewCandidatesPage/ViewCandidatesPageStyle";
import { CandidateJobStatus } from "../../../Firebase/FirebaseFunctions/CandidateJobStatus";

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const NewCandidatePage = () => {
  const { state } = useLocation();

  // values
  const [candidateFirstName, setCandidateFirstName] = useState<string>("");
  const [candidateLastName, setCandidateLastName] = useState<string>("");
  const [candidatePhone, setCandidatePhone] = useState<string>("");
  const [candidateEmail, setCandidateEmail] = useState<string>("");
  const [candidateNote, setCandidateNote] = useState<string>("");
  const [candidateGeneralRating, setCandidateGeneralRating] =
    useState<number>(-1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  // errors
  const [errorCandidateFirstName, setErrorCandidateFirstName] =
    useState<boolean>(false);
  const [errorCandidateLastName, setErrorCandidateLastName] =
    useState<boolean>(false);
  const [errorCandidatePhone, setErrorCandidatePhone] =
    useState<boolean>(false);
  const [errorCandidateEmail, setErrorCandidateEmail] =
    useState<boolean>(false);
  const [errorCandidateNote, setErrorCandidateNote] = useState<boolean>(false);
  const [errorCandidateGeneralRating, setErrorCandidateGeneralRating] =
    useState<boolean>(false);
  const [errorJobSelection, setErrorJobSelection] = useState<boolean>(false);
  // my "editJob"
  const [myCandidate, setMyCandidate] = useState<Candidate>();
  const [generalRating, setGeneralRating] = useState<number>(-1);

  // my loading
  const [loading, setLoading] = useState(true);

  const fetchCandidate = async () => {
    if (typeof state?.candidate?._firstName === "string") {
      setCandidateFirstName(state?.candidate?._firstName);
    }
    if (typeof state?.candidate?._lastName === "string") {
      setCandidateLastName(state?.candidate?._lastName);
    }
    if (typeof state?.candidate?._phone === "string") {
      setCandidatePhone(state?.candidate?._phone);
    }
    if (typeof state?.candidate?._eMail === "string") {
      setCandidateEmail(state?.candidate?._eMail);
    }
    if (typeof state?.candidate?._Note === "string") {
      setCandidateNote(state?.candidate?._note);
    }

    if (
      state?.candidate?._generalRating?.length >= 1 &&
      typeof state?.candidate?._generalRating[0] === "string"
    ) {
      setCandidateGeneralRating(Number(state?.candidate?._generalRating[0]));
    }

    setLoading(true);

    let candidate_ = await getFilteredCandidates(
      ["candidateId"],
      [state?.candidate?._candidateId?.toString()]
    );
    setMyCandidate(candidate_[0]);

    window.history.replaceState({}, document.title); // clean state
    setLoading(false);
  };

  const fetchJobs = async () => {
    const fetchedJobs = await getFilteredJobs();
    setJobs(fetchedJobs);
  };

  useEffect(() => {
    setLoading(false);
    if (state !== null) {
      // edit candidate
      if (state?.candidate !== null) {
        fetchCandidate();
      }
    }
    fetchJobs();
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!selectedJob) {
      setErrorJobSelection(true);
      return;
    }
    setFormSubmitted(true);
    if (
      candidateFirstName.length === 0 ||
      candidateLastName.length === 0 ||
      candidateEmail.length === 0 ||
      candidatePhone.length === 0 ||
      candidateNote.length === 0
    ) {
      if (candidateFirstName.length === 0) {
        setErrorCandidateFirstName(true);
      }
      if (candidateLastName.length === 0) {
        setErrorCandidateLastName(true);
      }
      if (candidatePhone.length === 0) {
        setErrorCandidatePhone(true);
      }
      if (candidateEmail.length === 0) {
        setErrorCandidateEmail(true);
      }
      if (candidateNote.length === 0) {
        setErrorCandidateNote(true);
      }
      if (candidateGeneralRating === -1) {
        setErrorCandidateGeneralRating(true);
      }
    } else {
      // edit
      if (state !== null && myCandidate !== null) {
        setLoading(true);

        if (myCandidate) {
          myCandidate._firstName = candidateFirstName;
          myCandidate._lastName = candidateLastName;
          myCandidate._phone = candidatePhone;
          myCandidate._eMail = candidateEmail;
          myCandidate._note = candidateNote;
          myCandidate._generalRating = Number(candidateGeneralRating);

          await myCandidate.edit();
        }
        setLoading(false);

        navigate("/management/manageJobs", {
          state: {
            msg: `השינויים עבור המועמד: ${myCandidate?._firstName} ${myCandidate?._lastName} נשמרו בהצלחה.`,
          },
        });
      }
      // add
      else {
        setLoading(true);
        let NewCandidateId = await generateCandidateId();

        let candidate = new Candidate(
          NewCandidateId,
          candidateFirstName,
          candidateLastName,
          candidateEmail,
          candidatePhone,
          -1,
          candidateNote
        );

        // Add the candidate to the selected job
        const jobNumber = selectedJob._jobNumber;
        const candidateJobStatus = new CandidateJobStatus(
          jobNumber,
          candidate._id,
          "הוגשה מועמדות"
        );
        await candidateJobStatus.add();
        if (!(await candidate.add())) {
          candidate = await getFilteredCandidates(
            ["eMail", "phone"],
            [candidateEmail, candidatePhone]
          )[0];
          NewCandidateId = candidate._id;
        }
        setLoading(false);

        navigate("/management/manageCandidates", {
          state: {
            msg: `המועמד ${candidateFirstName} ${candidateLastName} נוסף בהצלחה.`,
          },
        });
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setCvFile(file);
    }
  };

  const handleDelete = async () => {
    if (state !== null && myCandidate !== null) {
      setLoading(true);
      await myCandidate?.remove();
    }

    setLoading(false);

    navigate("/management/manageCandidates", {
      state: {
        msg: `המועמד ${myCandidate?._firstName} ${myCandidate?._lastName} הוסר בהצלחה.`,
      },
    });
  };

  const handleClick = () => {
    navigate("/management/manageCandidates");
  };

  return (
    <>
      {loading ? (
        <MyLoading loading={loading} setLoading={setLoading} />
      ) : (
        <>
          <Box sx={BoxGradientSx}>
            <Box
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              sx={{
                right: 0,
                top: "55%",
                left: "auto",
                bottom: "auto",
                backgroundColor: "hsla(0,0%,100%,.1)",
                background: "hsla(0,0%,100%,.1)",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                position: "absolute",
              }}
            />

            <Box
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              sx={{
                right: "6%",
                top: "6%",
                left: "auto",
                backgroundColor: "hsla(0,0%,100%,.1)",
                background: "hsla(0,0%,100%,.1)",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                position: "absolute",
              }}
            />

            <Box
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              sx={{
                left: "40%",
                top: 0,
                right: "auto",
                bottom: "auto",
                backgroundColor: "hsla(0,0%,100%,.1)",
                background: "hsla(0,0%,100%,.1)",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                position: "absolute",
              }}
            />

            <Box
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              sx={{
                right: "20%",
                top: "5%",
                bottom: "auto",
                backgroundColor: "hsla(0,0%,100%,.1)",
                background: "hsla(0,0%,100%,.1)",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                position: "absolute",
              }}
            />

            <Box
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              sx={{
                left: "0",
                top: "30%",
                bottom: "auto",
                backgroundColor: "hsla(0,0%,100%,.1)",
                background: "hsla(0,0%,100%,.1)",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                position: "absolute",
              }}
            />

            <Box
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              sx={{
                left: "4%",
                top: "16%",
                bottom: "auto",
                backgroundColor: "hsla(0,0%,100%,.1)",
                background: "hsla(0,0%,100%,.1)",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                position: "absolute",
              }}
            />

            <Box
              display={{
                xs: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex",
              }}
              sx={{
                left: "25%",
                top: "28%",
                bottom: "auto",
                backgroundColor: "hsla(0,0%,100%,.1)",
                background: "hsla(0,0%,100%,.1)",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                position: "absolute",
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                top: "165px",
                position: "absolute",
              }}
            >
              <Stack direction="column">
                <Stack direction="row" justifyContent="center" spacing={1}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ArticleOutlined sx={{ color: "#fff" }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Noto Sans Hebrew', sans-serif",
                      color: "#fff",
                      textAlign: "center",
                    }}
                    variant="h4"
                  >
                    {state === null
                      ? "מועמד חדש"
                      : `מועמד מס' ${state?.candidate?._candidateId}`}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    opacity: 0.6,
                    width: "100%",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "16px",
                    fontFamily: "'Noto Sans Hebrew', sans-serif",
                    mt: 1,
                  }}
                  variant="subtitle1"
                >
                  {state === null
                    ? `לתשומת ליבך: פעולה זו תיצור מועמד חדש.`
                    : "לתשומת ליבך: עדכון השינויים יוביל לאובדן הנתונים הקודמים לצמיתות."}
                </Typography>
                <Box
                  sx={{
                    background:
                      "linear-gradient(90deg,hsla(0,0%,100%,0),#fff,hsla(0,0%,100%,0))",
                    padding: 0.05,
                    width: "100%",
                    mt: 2,
                  }}
                />
              </Stack>
            </Box>
          </Box>

          <Box sx={MyPaperSx}>
            <Box>
              <Container>
                <Box>
                  <Box className="col-md-12">
                    <Box className="section-title">
                      <Form
                        noValidate={true}
                        onSubmit={handleSubmit}
                        sx={{ width: "100%", mt: 3 }}
                      >
                        <Stack
                          sx={{ mt: 3 }}
                          direction="row"
                          display={{
                            xs: "block",
                            sm: "block",
                            md: "block",
                            lg: "flex",
                            xl: "flex",
                          }}
                          spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2 }}
                        >
                          <Box sx={{ width: "100%" }}>
                            <FormLabel
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                              }}
                            >
                              <Typography sx={MyLabelSx}>שם פרטי:</Typography>
                              <Typography
                                sx={{ fontSize: 14, color: "#e91e63" }}
                              >
                                *
                              </Typography>
                            </FormLabel>

                            <TextField
                              sx={{
                                "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                                  {
                                    borderRadius: "0.375rem",
                                    font: "small-caption",
                                  },
                                "& .muirtl-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                                  {
                                    ":focus": {
                                      boxShadow: "0 0 0 0.2rem #c0cefc",
                                      backgroundColor: "#fff",
                                      border: "1px solid #7795f8",
                                      borderRadius: "0.375rem",
                                      outline: 0,
                                    },
                                  },
                                "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "1px solid #7795f8",
                                  },

                                "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "rgba(220,53,69)",
                                  },
                                "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "1px",
                                  },
                              }}
                              style={{ width: "100%" }}
                              size="small"
                              id="_candidateFirstName"
                              type="text"
                              required
                              autoComplete="off"
                              value={candidateFirstName}
                              error={errorCandidateFirstName}
                              onChange={(e) => {
                                setCandidateFirstName(e.target.value);
                                if (
                                  candidateFirstName.length > 0 &&
                                  errorCandidateFirstName
                                ) {
                                  setErrorCandidateFirstName(false);
                                }
                              }}
                            />
                            <FormHelperText
                              hidden={!errorCandidateFirstName}
                              security="invalid"
                              style={{
                                color: "#ef5350",
                                marginRight: "2px",
                                marginTop: 0,
                              }}
                            >
                              זהו שדה חובה.
                            </FormHelperText>
                            <FormHelperText
                              hidden={errorCandidateFirstName}
                              security="invalid"
                              style={{
                                marginRight: "2px",
                                marginTop: 0,
                                fontSize: 10,
                              }}
                            >
                              יופיע בתור שם המועמד.
                            </FormHelperText>
                          </Box>
                          <Box sx={{ width: "100%" }}>
                            <FormLabel
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                              }}
                            >
                              <Typography sx={MyLabelSx}>שם משפחה:</Typography>
                              <Typography
                                sx={{ fontSize: 14, color: "#e91e63" }}
                              >
                                *
                              </Typography>
                            </FormLabel>
                            <TextField
                              sx={{
                                "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                                  {
                                    borderRadius: "0.375rem",
                                    font: "small-caption",
                                  },
                                "& .muirtl-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                                  {
                                    ":focus": {
                                      boxShadow: "0 0 0 0.2rem #c0cefc",
                                      backgroundColor: "#fff",
                                      border: "1px solid #7795f8",
                                      borderRadius: "0.375rem",
                                      outline: 0,
                                    },
                                  },
                                "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "1px solid #7795f8",
                                  },

                                "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "rgba(220,53,69)",
                                  },
                                "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: "1px",
                                  },
                              }}
                              style={{ width: "100%" }}
                              size="small"
                              id="_region"
                              type="text"
                              required
                              value={candidateLastName}
                              error={errorCandidateLastName}
                              onChange={(e) => {
                                setCandidateLastName(e.target.value);
                                if (
                                  candidateLastName.length > 0 &&
                                  errorCandidateLastName
                                ) {
                                  setErrorCandidateLastName(false);
                                }
                              }}
                            />

                            <FormHelperText
                              hidden={!errorCandidateLastName}
                              security="invalid"
                              style={{
                                color: "#ef5350",
                                marginRight: "2px",
                                marginTop: 0,
                              }}
                            >
                              זהו שדה חובה.
                            </FormHelperText>
                          </Box>
                        </Stack>

                        <Stack
                          direction={{
                            xs: "column",
                            sm: "column",
                            md: "column",
                            lg: "row",
                            xl: "row",
                          }}
                          sx={{ mt: 1 }}
                          spacing={{ xs: 0, sm: 0, md: 1, lg: 2, xl: 2 }}
                        >
                          <Box sx={{ width: "100%" }}>
                            <FormLabel
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                              }}
                            >
                              <Typography sx={MyLabelSx}>
                                מספר טלפון:
                              </Typography>
                              <Typography
                                sx={{ fontSize: 14, color: "#e91e63" }}
                              >
                                *
                              </Typography>
                            </FormLabel>

                            <Box sx={{ mt: -1 }}>
                              <PhoneNumberSelection
                                phoneNumber={candidatePhone}
                                setPhoneNumber={setCandidatePhone}
                                error={errorCandidatePhone}
                                setError={setErrorCandidatePhone}
                                formSubmitted={formSubmitted} // Pass formSubmitted prop to PhoneNumberSelection
                              />
                            </Box>
                          </Box>

                          <Box sx={{ width: "100%" }}>
                            <FormLabel
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                              }}
                            >
                              <Typography sx={MyLabelSx}>eMail:</Typography>
                              <Typography
                                sx={{ fontSize: 14, color: "#e91e63" }}
                              >
                                *
                              </Typography>
                            </FormLabel>

                            <EmailInput
                              email={candidateEmail}
                              setEmail={setCandidateEmail}
                              error={errorCandidateEmail}
                              setError={setErrorCandidateEmail}
                              formSubmitted={formSubmitted}
                            />
                          </Box>
                        </Stack>

                        <Box sx={{ width: "100%", mt: 1 }}>
                          <FormLabel
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "start",
                            }}
                          >
                            <Typography sx={MyLabelSx}>הערות:</Typography>
                            <Typography sx={{ fontSize: 14, color: "#e91e63" }}>
                              *
                            </Typography>
                          </FormLabel>

                          <TextField
                            sx={{
                              "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                                {
                                  borderRadius: "0.375rem",
                                  font: "small-caption",
                                },
                              "& .muirtl-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                  ":focus": {
                                    boxShadow: "0 0 0 0.2rem #c0cefc",
                                    backgroundColor: "#fff",
                                    border: "1px solid #7795f8",
                                    borderRadius: "0.375rem",
                                    outline: 0,
                                  },
                                },
                              "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px solid #7795f8",
                                },

                              "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "rgba(220,53,69)",
                                },
                              "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px",
                                },
                            }}
                            style={{ width: "100%" }}
                            size="small"
                            id="_requirements"
                            type="text"
                            required
                            error={errorCandidateNote}
                            value={candidateNote}
                            onChange={(e) => {
                              setCandidateNote(e.target.value);
                              if (
                                candidateNote.length > 0 &&
                                errorCandidateNote
                              ) {
                                setErrorCandidateNote(false);
                              }
                            }}
                          />
                          <FormHelperText
                            hidden={!errorCandidateNote}
                            security="invalid"
                            style={{
                              color: "#ef5350",
                              marginRight: "2px",
                              marginTop: 0,
                            }}
                          >
                            זהו שדה חובה.
                          </FormHelperText>
                          <FormHelperText
                            hidden={errorCandidateNote}
                            security="invalid"
                            style={{
                              marginRight: "2px",
                              marginTop: 0,
                              fontSize: 10,
                            }}
                          >
                            הערות כלליות על המועמד
                          </FormHelperText>
                        </Box>

                        <Divider sx={{ mt: 4 }} />

                        <Box sx={{ width: "100%" }}>
                          <FormLabel
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "start",
                            }}
                          >
                            <Typography sx={MyLabelSx}>
                              דירוג כללי של המועמד:
                            </Typography>
                          </FormLabel>

                          <Rating
                            name="generalRating"
                            onChange={(event, newValue) => {
                              setGeneralRating(newValue as number);
                            }}
                            value={generalRating}
                            size="large"
                          />

                          <FormHelperText
                            hidden={errorCandidateGeneralRating}
                            security="invalid"
                            style={{
                              marginRight: "2px",
                              marginTop: 0,
                              fontSize: 10,
                            }}
                          >
                            דירוג זה ישמש להערכה כללית.{" "}
                          </FormHelperText>
                        </Box>

                        <Divider sx={{ mt: 4 }} />

                        <Box sx={{ width: "100%" }}>
                          <FormLabel
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "start",
                            }}
                          >
                            <Typography sx={MyLabelSx}>
                              קובץ קורות חיים:
                            </Typography>
                          </FormLabel>

                          <TextField
                            type="file"
                            id="resume"
                            variant="outlined"
                            onChange={handleFileChange}
                          />
                        </Box>

                        <Box sx={{ width: "100%" }}>
                          <FormLabel
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "start",
                            }}
                          >
                            <Typography sx={MyLabelSx}>משרה:</Typography>
                            <Typography sx={{ fontSize: 14, color: "#e91e63" }}>
                              *
                            </Typography>
                          </FormLabel>

                          <Select
                            sx={{
                              "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                                {
                                  borderRadius: "0.375rem",
                                  font: "small-caption",
                                },
                              "& .muirtl-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                  ":focus": {
                                    boxShadow: "0 0 0 0.2rem #c0cefc",
                                    backgroundColor: "#fff",
                                    border: "1px solid #7795f8",
                                    borderRadius: "0.375rem",
                                    outline: 0,
                                  },
                                },
                              "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px solid #7795f8",
                                },

                              "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "rgba(220,53,69)",
                                },
                              "& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  border: "1px",
                                },
                            }}
                            style={{ width: "100%" }}
                            id="jobNumber"
                            required
                            value={selectedJob ? selectedJob._jobNumber : ""}
                            error={errorJobSelection}
                            onChange={(e) => {
                              const jobNumber = parseInt(
                                e.target.value as string
                              );
                              const selectedJob =
                                jobs.find(
                                  (job) => job._jobNumber === jobNumber
                                ) || null;
                              setSelectedJob(selectedJob);
                              if (!selectedJob && errorJobSelection) {
                                setErrorJobSelection(false);
                              }
                            }}
                          >
                            <MenuItem value="">
                              <em>אנא בחר משרה</em>
                            </MenuItem>
                            {jobs.map((job) => (
                              <MenuItem
                                key={job._jobNumber}
                                value={job._jobNumber}
                              >
                                {job._title}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText
                            hidden={!errorJobSelection}
                            security="invalid"
                            style={{
                              color: "#ef5350",
                              marginRight: "2px",
                              marginTop: 0,
                            }}
                          >
                            זהו שדה חובה.
                          </FormHelperText>
                        </Box>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ mt: 3, mb: 3 }}
                        ></Stack>

                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ mt: 3, mb: 3 }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              mt: 1,
                              mb: 1,
                              backgroundColor: "#555abf",
                              ":hover": {
                                bgcolor: "#555abf",
                              },
                            }}
                            fullWidth
                          >
                            {state === null ? "פרסם" : "עדכן"}
                          </Button>

                          {state === null ? (
                            <></>
                          ) : (
                            <RemoveCandidateDialog
                              handleDelete={handleDelete}
                            />
                          )}
                        </Stack>
                      </Form>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
          <Box style={{ position: "absolute", top: "100px", right: "50px" }}>
            <Button onClick={handleClick} sx={designReturnButton}>
              <ArrowForwardIosIcon></ArrowForwardIosIcon>
              חזור
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default NewCandidatePage;

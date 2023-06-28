import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function MyJobRemoveDialog(props: { handleDelete: any }) {
  const { handleDelete } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        className="mt-3 mb-3"
        variant="contained"
        color="error"
        onClick={handleClickOpen}
        sx={{
          height: "fit-content",
          alignSelf: "center",
          width: "10%",
          backgroundColor: "#c82333",
          borderColor: "#bd2130",
        }}
      >
        הסר משרה
      </Button>

      <BootstrapDialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          הודעת אימות
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            האם את/ה בטוח/ה שברצונך להסיר מועמד זה לצמיתות?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="text" autoFocus onClick={handleClose}>
            ביטול
          </Button>
          <Button
            variant="text"
            color="error"
            type="submit"
            autoFocus
            onClick={handleDelete}
          >
            הסר
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

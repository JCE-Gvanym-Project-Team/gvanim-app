import { Button, Typography } from "@mui/material";


function RecruiterMainPage({ handlelogout }) {
  return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <Typography>ברוך הבא</Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="outlined" onClick={handlelogout}>התנתק</Button>
          </div>
        </div>
      </div>

  );
}

export default RecruiterMainPage;

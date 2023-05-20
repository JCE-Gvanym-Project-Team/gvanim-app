import { useState, useEffect } from "react";
import { dataref } from "../../Firebase/FirebaseConfig/firebase";
import MyTable from "./Components/MyTable/MyTable";
import { Box, Container, Fab } from "@mui/material";
import MyAvatar from "./Components/MyAvatar/MyAvatar";
import MyLoading from "../../Components/MyLoading/MyLoading";
import {
    ManageJobPageBoxSx,
    MyAvatarContainerSx,
    MySearchBarContainerStyle
} from "./ManageJobsPageStyle";
import MySearchBar from "./Components/MySearchBar/MySearchBar";


const ManageJobPageBody = (props: { setHomeActive: any,setReportsActive: any, setCandidatesActive: any,setJobsActive: any }) => {
    // for the navigation bar
    const { setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;
    setHomeActive(false); setCandidatesActive(false);
    setReportsActive(false); setJobsActive(true);
    // ----------------------------

    const [loading, setLoading] = useState(true);
    const [dataSize, setDataSize] = useState(0);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);


    if (loading) {
        return (<MyLoading />);
    }
    else {
        return (
            <>

                <Box className="ManageJobPage-Body" sx={ManageJobPageBoxSx}>

                    <Container sx={MyAvatarContainerSx} maxWidth="sm">
                        <MyAvatar dataSize={dataSize} />
                    </Container>

                    <Container
                        style={MySearchBarContainerStyle} maxWidth="sm">

                        <MySearchBar />

                    </Container>

                    <MyTable setDataSize={setDataSize} />


                </Box>

            </>



        );
    }
}


export default ManageJobPageBody;

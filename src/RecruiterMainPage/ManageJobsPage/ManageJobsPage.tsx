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
import { Navigation } from "@mui/icons-material";


const ManageJobPageBody = () => {
    const [loading, setLoading] = useState(true);

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
                        <MyAvatar />
                    </Container>

                    <Container
                        style={MySearchBarContainerStyle} maxWidth="sm">

                        <MySearchBar />

                    </Container>

                    <MyTable />


                </Box>

            </>



        );
    }
}


export default ManageJobPageBody;

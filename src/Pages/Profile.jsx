import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Switch,
  MenuItem,
  Select,
  Button,
  CardContent,
  Typography,
  Container,
  useTheme,
  Divider,
  Tab, 
  Tabs,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ArrowBack } from "@mui/icons-material";
import { handleLogOut } from "../Firebase";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import dayjs from "dayjs";
import { updateUserSettings } from "../Firebase";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat)

const Profile = () => {
  const theme = useTheme();
  const data = [
    "24 Hrs before items expire",
    "48 Hrs before items expire",
    "72 Hrs before items expire",
  ];
  const uid = localStorage.getItem("uid");

  const [sendEmail, setSendEmail] = useState(
    localStorage.getItem("sendEmail") === "true" ? true : false
  );
  const name = localStorage.getItem("name");
  const photoUrl = localStorage.getItem("photoUrl");

  const getTime = () => {
      {
          const tmp = localStorage.getItem("sendBefore");
          if (!tmp) return 24;
          const parsed = parseInt(tmp);
          if (parsed === 24) return 24;
          if (parsed === 48) return 48;
          if (parsed === 72) return 72;
          return 24;
      }
  };
  
  const [sendBefore, setSendBefore] = useState(
    getTime()
  );

    const getSendTime = () => {
        const tmp = localStorage.getItem("sendTime");
        let result = dayjs("07:00", "HH:mm");
        console.log(tmp, result);
        if (!tmp) return result;
        if (tmp.length !== 5) return result;
        return dayjs(tmp, "HH:mm").isValid() ? dayjs(tmp, "HH:mm") : result;
    };

  const [sendTime, setSendTime] = useState(
    getSendTime()
  );

  useEffect(() => {
      console.log(dayjs(
          "07:00",
          "HH:mm"
      ));
    localStorage.setItem("sendEmail", sendEmail);
    localStorage.setItem("sendBefore", sendBefore);
    localStorage.setItem("sendTime", sendTime.format("HH:mm"));
    updateUserSettings(uid, {
      settings: {
        sendEmail: sendEmail,
        sendBefore: sendBefore,
        sendTime: sendTime.format("HH:mm"),
      },
    });
  }, [sendEmail, sendBefore, sendTime]);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue); 
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.primary["darkGreen"],
          color: theme.palette.primary.contrastText,
          marginBottom: 3, // Added margin for spacing between components
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: 3 }}
        >
          <Grid item>
            <ArrowBack
              onClick={() => (window.location.href = "/")}
              sx={{ cursor: "pointer" }}
            />
          </Grid>
          <Grid item xs={true}>
            <Typography
              variant="h1"
              sx={{ textAlign: "center", fontSize: "28px" }}
            >
              Account & Settings
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={tabValue} 
          onChange={handleTabChange} 
          aria-label="tabs example" 
         indicatorColor="primary"
         textColor="inherit"
         variant="fullWidth"
         scrollButtons={false}
         >
          <Tab label="Profile" />
          <Tab label="Notifications" />

        </Tabs>
      </Box>
      <Box sx={{ padding: 3 }}>

      {tabValue === 1 && (
        <Grid container spacing={2}>
          {" "}
          {/* Added container with spacing */}
          <Grid item xs={12}>
            <Typography
              variant="h1"
              sx={{ textAlign: "left", fontSize: "28px" }}
            >
              Manage Notifications
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="p"
              sx={{ textAlign: "left", fontSize: "16px" }}
            >
              Receive newsletter to stay up-to date with expiring groceries and
              recipe recommendations
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography
              variant="H3"
              sx={{ textAlign: "left", fontSize: "18px" }}
            >
              Email
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Switch
              label={"Email"}
              checked={sendEmail}
              onChange={() => setSendEmail(!sendEmail)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{ textAlign: "left", fontSize: "18px" }}
            >
              When do you prefer to be notified:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Select
              value={sendBefore}
              fullWidth
              disabled={!sendEmail}
              onChange={(e) => setSendBefore(e.target.value)}
            >
              <MenuItem value={24}>{data[0]}</MenuItem>
              <MenuItem value={48}>{data[1]}</MenuItem>
              <MenuItem value={72}>{data[2]}</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{ textAlign: "left", fontSize: "18px" }}
            >
              At what time of day:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={sendTime}
                onChange={(newValue) => {
                  setSendTime(newValue);
                  console.log(newValue.format("HH:MM"));
                }}
                fullWidth
                disabled={!sendEmail}
                inputFormat={{
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  timeZone: "UTC",
                }}
              />
            </LocalizationProvider>
          </Grid> 
        </Grid> 

          )}

        {tabValue === 0 && (
          <Box>

           <Box 
              sx={{
                display: "flex",
                alignItems: "center", 
                justifyContent: "start",  
                gap: 1,  
                pl: 1,  
              }}
            > 
              <Box
                component="img"
                src={photoUrl}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                }}
              />
              
              <Typography
                variant="h1"  
                sx={{ ml: 1, fontSize: "28px" }}  
              >
                {name}
              </Typography>
            </Box>

          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column"}}>
            <Button
              variant="contained"
              onClick={handleLogOut}
              sx={{
                backgroundColor: theme.palette.primary["darkGreen"],
                color: theme.palette.primary.contrastText,
                mt: "40px",
                ml: "20px",
                width: "310px",
              }}
            >
              Logout
            </Button>
            {/* <Button
            //  onClick={() => handleDelete()}
              variant="contained"
              sx={{
                
                backgroundColor: theme.palette.primary["darkGreen"],
                color: theme.palette.primary.contrastText,
                ml: "20px",
                mt: 2,
                width: "310px",
              }}
            >
              Delete Account
            </Button> */}
          </Grid>
          </Box>
        )}
      
      
      </Box>
    </Box>
  );
};

export default Profile;

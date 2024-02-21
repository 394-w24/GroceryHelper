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
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { ArrowBack } from "@mui/icons-material";
import { handleLogOut } from "../Firebase";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import datjs from "dayjs";
import { updateUserSettings } from "../Firebase";

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
  const [sendBefore, setSendBefore] = useState(
    localStorage.getItem("sendBefore")
      ? parseInt(localStorage.getItem("sendBefore"))
      : 24
  );
  const [sendTime, setSendTime] = useState(
    datjs(
      localStorage.getItem("sendTime")
        ? localStorage.getItem("sendTime")
        : "07:00",
      "HH:mm"
    )
  );

  useEffect(() => {
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
      <Box sx={{ padding: 3 }}>
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
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={handleLogOut}
              sx={{
                backgroundColor: theme.palette.primary["darkGreen"],
                color: theme.palette.primary.contrastText,
              }}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;

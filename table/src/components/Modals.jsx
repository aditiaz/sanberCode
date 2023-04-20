import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";

export const FormModal = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("p");
  const [born_date, setBorn_date] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    const payload = {
      name: name,
      address: address,
      gender: gender,
      born_date: born_date,
    };

    axios
      .post("https://cms-admin-v2.ihsansolusi.co.id/testapi/user", payload, config)
      .then((response) => {
        console.log(response.data);
        props.handleCloseForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: "40vw", margin: "auto", marginTop: "5vh", backgroundColor: "white", p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
          {props.judul}
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="name"
            variant="outlined"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="address"
            variant="outlined"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <FormControl fullWidth component="fieldset" margin="normal">
            <Typography variant="subtitle1" component="legend">
              Jenis Kelamin
            </Typography>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="p" control={<Radio />} label="Wanita" />
              <FormControlLabel value="l" control={<Radio />} label="Pria" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Tanggal Lahir"
            type="date"
            name="born_date"
            InputLabelProps={{ shrink: true }}
            value={born_date}
            onChange={(e) => setBorn_date(e.target.value)}
          />

          <Button type="submit" sx={{ width: "100%", marginTop: "2rem" }} variant="contained">
            Simpan
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export const FormModalEdit = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("p");
  const [born_date, setBorn_date] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    const payload = {
      name: name,
      address: address,
      gender: gender,
      born_date: born_date,
    };

    axios
      .put(`https://cms-admin-v2.ihsansolusi.co.id/testapi/user/${props.id}`, payload, config)
      .then((response) => {
        console.log(response.data);
        props.handleCloseForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ width: "40vw", margin: "auto", marginTop: "5vh", backgroundColor: "white", p: 4 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: "center" }}>
          {props.judul}
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="name"
            variant="outlined"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="address"
            variant="outlined"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <FormControl fullWidth component="fieldset" margin="normal">
            <Typography variant="subtitle1" component="legend">
              Jenis Kelamin
            </Typography>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="p" control={<Radio />} label="Wanita" />
              <FormControlLabel value="l" control={<Radio />} label="Pria" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Tanggal Lahir"
            type="date"
            name="born_date"
            InputLabelProps={{ shrink: true }}
            value={born_date}
            onChange={(e) => setBorn_date(e.target.value)}
          />

          <Button type="submit" sx={{ width: "100%", marginTop: "2rem" }} variant="contained">
            Simpan
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export const DetailModal = ({ open, handleClose, data }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          backgroundColor: "white",
          boxShadow: 24,
          padding: 4,
          zIndex: 200,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" mb={2} fontWeight="bold">
          Detail User
        </Typography>
        <Typography>name: {data.name}</Typography>
        <Typography>address: {data.address}</Typography>
        <Typography>Jenis Kelamin: {data.gender}</Typography>
        <Typography>Tanggal Lahir: {data.born_date}</Typography>
        <Typography>Tanggal Input: {data.created_at}</Typography>
      </div>
    </Modal>
  );
};
export const DeleteModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
          Konfirmasi Delete
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} gutterBottom>
          Apakah Anda yakin ingin menghapus?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={props.handleClose} color="inherit">
            Batal
          </Button>
          <Button variant="contained" startIcon={<Delete />} style={{ marginLeft: "1rem" }}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

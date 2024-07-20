import React, {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function Popup({ updateCalories }) {

    const [formData, setFormData] = useState({
        caloriesBreakfast: '',
        caloriesLunch: '',
        caloriesDinner: '',
        caloriesSnack: '',
        caloriesGoal: ''
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);

      setFormData({
        caloriesBreakfast: '',
        caloriesLunch: '',
        caloriesDinner: '',
        caloriesSnack: '',
        caloriesGoal: ''
    });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const jwtToken = sessionStorage.getItem("token");
            if (!jwtToken) {
                return;
            }

            const filteredFormData = Object.fromEntries(
                Object.entries(formData).filter(([key,value])=> value !== '')
            );
    
            await axios.post('/update-calories', filteredFormData, {
                headers: {
                    'Authorization': `Bearer ${jwtToken}`
                }
            });
            updateCalories(filteredFormData);
            handleClose();
        } catch (error) {
            console.error('Error updating calories:', error);
        }
    };

    return (
        <div>
            <Button variant="contained" style={{backgroundColor:'rgb(21, 145, 4)', fontWeight:600}} onClick={handleClickOpen}>
                    Change Calories
            </Button>
                <Dialog
                    open={open}
                    style={{color:'red'}}
                    onClose={handleClose}
                    PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        handleSubmit(event);
                        handleClose();
                    },
                    }}
                >
                    <DialogTitle>Calorie Tracker</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Update your calorie intakes here
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="caloriesBreakfast"
                        name="caloriesBreakfast"
                        label="Breakfast calories"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="caloriesLunch"
                        name="caloriesLunch"
                        label="Lunch calories"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="caloriesDinner"
                        name="caloriesDinner"
                        label="Dinner calories"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="caloriesSnack"
                        name="caloriesSnack"
                        label="Snack calories"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="caloriesGoal"
                        name="caloriesGoal"
                        label="Goal calories"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

export default Popup
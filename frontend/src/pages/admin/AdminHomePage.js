import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';
import { createTheme, ThemeProvider, Typography } from '@mui/material';

const colorfulTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B6B',
    },
    secondary: {
      main: '#4ECDC4',
    },
    background: {
      default: '#2F2E41',
      paper: '#3E3D53',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { studentsList } = useSelector((state) => state.student);
  const { sclassesList } = useSelector((state) => state.sclass);
  const { teachersList } = useSelector((state) => state.teacher);
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllStudents(adminID));
    dispatch(getAllSclasses(adminID, "Sclass"));
    dispatch(getAllTeachers(adminID));
  }, [adminID, dispatch]);

  const numberOfStudents = studentsList && studentsList.length;
  const numberOfClasses = sclassesList && sclassesList.length;
  const numberOfTeachers = teachersList && teachersList.length;

  return (
    <ThemeProvider theme={colorfulTheme}>
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          py: 4,
          background: 'linear-gradient(135deg, #2F2E41 0%, #3E3D53 100%)',
          borderRadius: 4,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <img src={Students} alt="Students" />
              <Typography variant="h6" sx={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                Total Students
              </Typography>
              <StyledData start={0} end={numberOfStudents} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <img src={Classes} alt="Classes" />
              <Typography variant="h6" sx={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                Total Classes
              </Typography>
              <StyledData start={0} end={numberOfClasses} duration={5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledPaper>
              <img src={Teachers} alt="Teachers" />
              <Typography variant="h6" sx={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                Total Teachers
              </Typography>
              <StyledData start={0} end={numberOfTeachers} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                backgroundColor: 'rgba(62, 61, 83, 0.7)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: rgba(62, 61, 83, 0.7);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 40px rgba(0, 0, 0, 0.3);
  }

  img {
    max-width: 80px;
    margin-bottom: 16px;
  }
`;

const StyledData = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: #4ECDC4;
  font-weight: bold;
`;

export default AdminHomePage;

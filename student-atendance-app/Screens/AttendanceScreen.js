import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';

export default class AttendanceScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      students: null,
    };
  }
  componentDidMount() {
    db.ref('/').once('value', data => {
      var students = [];
      var rawStudentData = JSON.parse(JSON.stringify(data)).students;
      for (var i in rawStudentData) {
        students.push(rawStudentData[i]);
      }

      this.setState({
        students: students,
      });
    });
  }
  goToVerificationScreen = () =>{
    this.props.navigation.navigate('VerificationScreen');
  }
  renderStudents = () => {
    var studentsView = [];
    if (!this.state.students) {
      return <View />;
    }
    this.state.students.map((item, index) => {
      studentsView.push(
        <View style={styles.textContainer}>
      <CheckBox
      style={styles.box}
      value={item.attendance}
      onValueChange={() => {
          var students = this.state.students;
          students[index].attendance = !students[index].attendance;
          this.setState({
            students: students
          });
          db.ref('/').update({
            students : this.state.students
          })
        }}
    />
    <Text style={styles.boxText}>{item.name}</Text>
    </View>);          
    });

    return (
      <View>
        {studentsView}
      </View>
    );
  };

  render() {
    return (
      <View>
        <AppHeader title="Student Attendance App" />
        {this.renderStudents()}
        <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]} onPress={this.goToVerificationScreen}>
        <Text style={[styles.buttonText]}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer:{
    flexDirection : 'row',
    alignContent : 'center',
  },
  box:{
    marginTop : 10,
    width : 60,
    height : 60,

  },
  boxText:{
    fontSize : 40,
    marginTop : 10,
  },
    button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 50,
    width: 200,
    height: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontStyle: 'bold',
    fontSize : 30,
  },
});

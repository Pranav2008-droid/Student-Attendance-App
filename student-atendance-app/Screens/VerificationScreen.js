import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import db from '../config';

export default class VerificationScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      students : null
    }
    this.numberOfStudentsPresent = 0;

  }
  goToAttendanceScreen = () =>{
    this.props.navigation.navigate('AttendanceScreen');
  }
  componentDidMount(){
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
  renderStudents = () => {
    var studentsView = [];
    if (!this.state.students) {
      return <View />;
    }
    this.state.students.map((item, index) => {
      
      if(this.state.students[index].attendance){
          this.numberOfStudentsPresent = this.numberOfStudentsPresent + 1;
      }
      studentsView.push(
    <Text>{JSON.stringify(this.state.students[index].name).replace(/"/g, '')} : {JSON.stringify(this.state.students[index].attendance)}</Text>)

    });

    return (
      <View>
        {studentsView}
        <Text>total number of students present : {this.numberOfStudentsPresent}</Text>
      </View>
    );
  };
  render() {
    return (
      <View>
      {this.renderStudents()}
        <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]} onPress={this.goToAttendanceScreen}>
        <Text style={[styles.buttonText]}>Back</Text>
        </TouchableOpacity>        
      </View>

    );
  }
}

const styles = StyleSheet.create({
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


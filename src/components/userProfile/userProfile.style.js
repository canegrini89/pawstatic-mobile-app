import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({

  contAvatar: {
    width: 130,
    height: 130,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  container: {
    flex: 1
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:26,
    textAlign: 'center',
    borderWidth: 1,
    height: 80,
    borderRadius: 23,
    width: '80%',
  },
  text: {
    marginTop:26,
    height: 150,
    width: '80%',
    textAlign: 'center',
  },
  descriptionText:{
    textAlign: 'center'
  },
})
export default styles
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  container: {
    flex:0.7,
    marginLeft: 20
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
  bodyContent:{
    paddingTop:40,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  menuBox:{
    backgroundColor: "#DCDCDC",
    width:100,
    height:100,
    alignItems: 'center',
    justifyContent: 'center',
    margin:12,
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:2,
      width:-2
    },
    elevation:4,
    borderRadius: 30
  },
  icon: {
    width:60,
    height:60,
  },
  info:{
    fontSize:22,
    color: "#696969",
  },
  userList:{
    flex:1, 
  },
  cardContent: {
    marginLeft:20,
    marginTop:10,
    flexDirection: 'row'
  },
  image:{
    width:70,
    height:70,
    borderRadius:45,
  },
  listContainer:{
    alignItems:'center'
   },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    marginHorizontal:16,
    backgroundColor:"white",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row',
    alignItems: 'center'
  },
  cardFriend:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    
    marginVertical: 5,
    marginHorizontal:16,
    backgroundColor:"#FBDAAA",
    flexBasis: '46%',
    padding: 10,
    flexDirection:'row',
    alignItems: 'center'
  },
  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  about:{
    marginHorizontal:10
  },
  contButon: {
    width: '37%',
    alignItems: 'flex-end',
  },
  contText: {
    width:'50%'
  },
  followButton: {
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  followButtonTextDisbaled: {
    color: "#FFFFFF",
    fontSize:20,
  },
  followButtonDisabled: {
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "grey",
  },
  
popupOverlay: {
  backgroundColor: "#00000057",
  flex: 1,
  marginTop: 30,
  marginBottom: 70
},
btnClose:{
  height:20,
  backgroundColor:'#20b2aa',
  padding:20
},
popupButtons: {
  marginTop: 170,
  flexDirection: 'row',
  borderTopWidth: 1,
  borderColor: "#eee",
  justifyContent:'center'
},
});

export default styles
import {StyleSheet, Dimensions} from 'react-native'

 export const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#eeeeee"
  },
  header:{
    backgroundColor: "#00CED1",
    height:200
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    flex:1,
  },
  detailContent:{
    top:80,
    height:500,
    width:Dimensions.get('screen').width - 90,
    marginHorizontal:30,
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
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
 /************ modals ************/

 header:{
  backgroundColor: "#00BFFF",
  height:200,
},
avatarModal: {
  width: 130,
  height: 130,
  borderRadius: 63,
  borderWidth: 4,
  borderColor: "white",
  marginBottom:10,
  alignSelf:'center',
  position: 'absolute',
  marginTop:130
},
nameModal:{
  fontSize:22,
  color:"#FFFFFF",
  fontWeight:'600',
},
bodyModal:{
  marginTop:40,
},
bodyContentModal: {
  flex: 1,
  alignItems: 'center',
  padding:30,
},
popupButtons: {
  marginTop: 170,
  flexDirection: 'row',
  borderTopWidth: 1,
  borderColor: "#eee",
  justifyContent:'center'
},

nameModal:{
  fontSize:28,
  color: "#696969",
  fontWeight: "600"
},
infoModal:{
  fontSize:16,
  color: "#00BFFF",
  marginTop:10
},
descriptionModal:{
  fontSize:16,
  color: "#696969",
  marginTop:10,
  textAlign: 'center'
},
buttonContainerModal: {
  marginTop:10,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
  backgroundColor: "#00BFFF",
},
popup: {
  backgroundColor: 'white',
  marginTop: 80,
  marginHorizontal: 20,
  borderRadius: 7,
},
popupOverlay: {
  backgroundColor: "#00000057",
  flex: 1,
  marginTop: 30,
},
btnClose:{
  height:20,
  backgroundColor:'#20b2aa',
  padding:20
},
}); 
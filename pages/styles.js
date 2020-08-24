import React, { Component } from 'react';  

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create ({
    TitleText: {
        fontSize:30, 
        fontFamily:'Montserrat-Bold',
        color:'#343434'
    },
    roundButton: {
        width:width*.8,
        height:height*0.09,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:5,
        borderColor:'rgba(0,0,0,0.2)' ,
        marginBottom:height*.045,
        borderWidth:1,
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:height*0.045,

    },
    TextiputHeader: {
        fontSize:20,
        fontFamily:'Montserrat-Bold', 
        color:'rgba(255,255,255,1)'
    },
    textInput: {
        width:width*.9,
        height:height*0.08,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:5,
        borderColor:'rgba(0,0,0,0.2)' ,
        marginBottom:height*.045,
        borderWidth:1,
        justifyContent:'center'
    },
    textInputLogin: {
        width:width*.9,
        height:height*0.09,
        backgroundColor:'rgba(255,255,255,1)',
        borderRadius:width*.45,
        borderColor:'rgba(0,0,0,0.2)' ,
        marginBottom:height*.035,
        justifyContent:'center'
    },
    textinputText: {
        fontSize:20,
        fontFamily:'Montserrat-Regular',
        color:'#545454',
        marginLeft:width*.05
    },
    categoryView: {
        width: width*.45,
        height: width*.45, 
        borderRadius:10, 
        backgroundColor:'rgba(255,255,255,1)',
        alignItems:'center',
        padding:10
    },
    categoryImage: {
        width: width*.35, 
        height: width*.35, 
        borderRadius:10, 
        resizeMode: 'stretch'
    },
    homeCategoryImage: {
        width: width*.27, 
        height:  width*.27, 
        borderRadius:10,
        resizeMode: 'stretch'
    },
    homeCategoryView: {
        width: width*.3, 
        height: height*.25, 
        borderRadius:10, 
        backgroundColor:'rgba(255,255,255,1)', 
        alignItems:'center', 
        justifyContent:'center',
        elevation:5,
    },
    homeCategoryViewSmall: {
        width: width*.13, 
        height: height*.1, 
        borderRadius:10, 
        //backgroundColor:'rgba(255,255,255,1)', 
        alignItems:'center', 
        justifyContent:'center',
        elevation:5,
    },
    textinputTextSmall: {
        fontSize:11,
        fontFamily:'Montserrat-Medium',
        color:'#545454',
        marginLeft:width*.05
    },
    homeCategoryImageSmall: {
        width: width*.09, 
        height:  width*.09, 
        borderRadius:10,
        resizeMode: 'stretch'
    }
 })
 export default styles
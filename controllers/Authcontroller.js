// const req = require('express/lib/request');
const User = require('../models/usermodel.js');
const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const Apperror = require('../appError.js');


const catchAsync = require('./../catchAsync');
const AppError = require('./../appError');


exports.signup = async (req, res, next) => {
  try {
    
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
     
      data: {
        newUser
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({  
      status: 'fail',
      message: err
    });
  }
};


exports.login = catchAsync(async (req, res, next) => {

  console.log(req.body)
  const { email, password } = req.body;

  // if email password exist
  if (!email || !password) {
    return next(new Apperror('please provide email and password', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');
  

    const correct = await user.correctpassword(password, user.password);

    // console.log(correct);

    if (!user || !correct) {
      return next(new Apperror('Incorrect email or password', 401));
    }



    // console.log('sffs');
    res.status(200).json({
      status: 'success',
    
    });
  } catch (err) {
    status: 'fail';
    console.log(err)
  }
});





exports.Addteacher = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { name,email } = req.body.data;


  try {
    console.log(email);
    const user = await User.findOne({ email });
let arr=user.teacher
    if (!arr.includes(name)) {
      arr.push(name);
    }

    const newuser=await User.updateOne({email},{$set:{teacher:arr}});

    

    // console.log('sffs');
    res.status(200).json({
      status: 'success',
     
    });
  } catch (err) {
    status: 'fail';
    console.log(err)
  }
});


exports.Removeteacher = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { name,email } = req.body.data;


  try {
    console.log(email);
    const user = await User.findOne({ email });
let arr=user.teacher
    if (!arr.includes(name)) {
      arr = arr.filter(item => item !== name)
    }

    const newuser=await User.updateOne({email},{$set:{teacher:arr}});

    

    // console.log('sffs');
    res.status(200).json({
      status: 'success',
     
    });
  } catch (err) {
    status: 'fail';
    console.log(err)
  }
});


exports.getdata = catchAsync(async (req, res, next) => {
  
  
  try {
    const { email } = req.body.dd;
    console.log(req.body);
    // console.log(email);
    const user = await User.findOne({ email });


    console.log(user)

    // console.log('sffs');
    res.status(200).json({
      status: 'success',
      data:user.teacher
     
    });
  } catch (err) {
    status: 'fail';
    console.log(err)
  }
});

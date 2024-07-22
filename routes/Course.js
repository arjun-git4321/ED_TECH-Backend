const express=require("express");
const router=express.Router();

//course

const {courseCreate,showAllCourses,getCourseDetails}=require("../controllers/Course");

//Category
const {categoriesCreate,getAllCategories,categoryPageDetails}=require("../controllers/Category");

//section
const {createSection,updateSection,deleteSection}=require("../controllers/Section");

//sub-section
const {createSubSection,deleteSubSection,}=require("../controllers/SubSection");

//ratingAndReviews
const {creteRatingAndReview,getAverageRating,getAllRatings}=require("../controllers/RatingAndReview");

//middle wares

const {auth,isStudent,isInstructor,isAdmin,}=require("../middlewares/auth");



//Course only created by Instructor so we will add instructor middleware

router.post("/createCourse",auth,isInstructor,courseCreate);
router.post("/addSection",auth,isInstructor,createSection);
router.post("/updateSection",auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
router.post("/showAllCourses",auth,isInstructor,showAllCourses);
router.post("/getCourseDetails",auth,isInstructor,getCourseDetails);


//category only created by admin, add admin middleware
router.post("/createCategory",auth,isAdmin,categoriesCreate);
router.get("/getAllCategories",getAllCategories);
router.post("/categoryPageDetails",categoryPageDetails);

//ratingAndReview

router.post("/creteRatingAndReview",auth,isStudent,creteRatingAndReview);
router.get("/getAverageRating",getAverageRating);
router.get("/getAllRatings",getAllRatings);



module.exports=router;
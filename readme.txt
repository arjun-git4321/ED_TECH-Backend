In this project we have created a all the models in model folder and user schema in User.js
and realtions too.
Here we see in this project some folders are using to ,
    configurations folder for DataBase connection && razorpay connection used in the payments setup
    Models folder for user schemas and models
    routes folder is routing and caling of handlers
    Index.js is running and starting of our server
    controllers folder is writing our busyness logic
        In this created otp send handlers
        Auth.js
            signin handlers
            login handler
            sendOtp handler

        ResetPassword.js
            passwordResetToken
                *in that first we need to create another token for passowrd reset.
            resetPasswordNow
                *in that using that token and reset the passowrd and upadate new password in the db.

        Tag.js
            *tagsCreate
                in this create a tag to the save into the DataBase
            *showAllTags
                * in that show all tags saved in the database.

        Course.js
            * CourseCreate
                *in that course create and saved in to the database, taking instructor id and save that course id to that instructor database.
            *showAllCourse
                *show all courses save into the database

        Section.js
            *createSection
                *in this created create Section and saved sectionId into courseDb
            *updateSection
                *in this update that section takeing that id and update that section
            *deletesection
                *in this delete that section taking id

        SubSection.js
            *createSubSection
                *in this create one subSection and save that id into the section schema
            *deleteSubSection
                *in this delete one section taking that specific id

        Profile.js
            *updateProfile
                *in this update profile and save those profile detailes into the addition profile schema
            *deleteProfile
                *in this delete profile with the profile id
            *GetAllusers
                *in this get all users from the given user id

        Payments.js
            *capturePAyment
                *in this student capture the payment before checking the student is allready enrolled that course or not
            *verifySignature
                *In this verify the student signature and razorpay signature

        RatingsAndReview
            *createRatigAndReview
                *In this taking the user id and giving that specific course to some rating 
            *getAverageRating
                *In this getting some average by using aggregate method in mongoose.
            *getAllRatings
                *In this to find all ratings stored in the database
                
    -utils folder 
        mailSender 
            *file inside the logic of mails sending
        imageUploader
            *in this configurations to save the images into the cloudinary

    mails/templates
        *courseEnrollmentTemplate
            *in this course enrollment mail structure
        *emailVerificationTemplate
            *in this emailVerificationTemplate mail structure
        *passwordUpdate
            *In this password update mail Structure 

Adding routes folder to add separate end points.
    routes
        Course.js
        payment.js
        Profile.js
        User.js
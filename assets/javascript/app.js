$("document").ready(function () {

    ////*********Sets variables and accesses tags in DOM********////    
    let $start = $("#startButton");
    let $goBack = $("#goBackButton");
    let $timeRemaining = $("#timeRemaining");

    let $question = {
        question: ["Who is the actor behind 'Iron Man'?", "What type of technology keeps the shrapnel from entering Tony's heart and powers Iron Man?", "How does Tony escape the desert in Iron Man 1?", "What is the name of Tony's computerised help system?","What is the name of the terrorist organization that kidnapped Tony Stark in Iron Man One?",
        "What position within Stark Industries does Tony give to Pepper Potts?","While in captivity and injured from shrapnel, Tony is assisted by whom?","What is Pepper Potts allergic to?", "What is Tony doing when he first meets Natalie Rushman/Natasha Romanoff, AKA the Black Widow?","What psychological condition does Tony Stark have?"],
        $options: [
            ["John Jameson", "Tony Stark", "Robert Downey Jr.", "Gerard Butler"],
            ["Arc Reactor Technology", "Gama Rays", "Radioactive Isotopes", "Infinity Stone"],
            ["He lassos a camel and rides to safety.", "He is rescued by Captain America.", "He befriends his captor and convinces him to let him go.", "James Rhodes locates him with helicopters."],

            ["Querty", "Jarvis", "Tron", "Iron Man jr."],
            ["The Golden Triad", "Ten Rings", "Death Haven","Six Slips" ],
            ["Vice President", "Personal Secretary", "Chief Executive Officer", "Manager of Finances"], 
            ["Dr Yinsen","PepperPotts","The Hulk","His Father"],    
            ["Peanuts","Beas","Lilacs","Strawberries"],
            ["Smoking a Cigar","Sleeping","Boxing","Dancing at a nightclub"],
            ["Depression","Narcissism","Insomnia","Schitzophrenia"],
        ],
        $answer: ["Robert Downey Jr.", "Arc Reactor Technology", "James Rhodes locates him with helicopters.", "Jarvis", "Ten Rings","Chief Executive Officer","Dr Yinsen", "Strawberries", "Boxing", "Narcissism"]
    }
    letguesses = [];

    let $timer;
    let int;
    let questionTimer;
    let wins = 0
    let losses = 0
    let miss = 0
    let x;
    $goBack.hide()

    //////////////////////////////////////////////////////////////////////////////////////////////////

    ////********displays the questions and corresponding answer options on screen******////
    function questionArray(x) {
        $("#question").html($question.question[x]);
        $("#option1").html($question.$options[x][0]);
        $("#option2").html($question.$options[x][1]);
        $("#option3").html($question.$options[x][2]);
        $("#option4").html($question.$options[x][3]);
        $("#picture").hide();
        countDown(30)

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////

    ////*****if the person answers wrong or fails to click-> displays the corect answer and adds one to incorrect answers*****////
    function wrong(x) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=IronMan&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                $("#picture").attr("src", results[2].images.fixed_height.url);
                clearInterval(int);
                $("#question").html("I'm sorry the correct answer was " + $question.$answer[x]);
                
                $("#option1").html("");
                $("#option2").html("");
                $("#option3").html("");
                $("#option4").html("");
                $("#picture").show();
            })
       // questionArray(x)

       
    }
    ///////////////////////////////////////////////////////////////////////////////////////////

    ////*******if correct answer is selected-> displays congratulation and adds one to correct answers******////
    function right(x) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=IronMan&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                $("#picture").attr("src", results[8].images.fixed_height.url);
                        clearInterval(int);
        $("#question").html("You got it! The correct answer was " + $question.$answer[x]);

        $("#option1").html("");
        $("#option2").html("");
        $("#option3").html("");
        $("#option4").html("");
        $("#picture").show();
            })

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////    

    ////********************displays a countdown on screen*****************////
    function countDown(i) {
        clearInterval(int)
        int = setInterval(function () {
            $("#timeRemaining").html("Time Remaining: " + i);
            i-- || clearInterval(int)


        }, 1000);
    };

    ///////////////////////////////////////////////////////////////////////////////////////

    ////*********************starts the game when you click it****************////
    $("#startButton").on("click", function () {

        x = 0
        //*************timer counts to 30 and if nothing clears it displays wrong************************ ////
        //*************function or if on last question will display ending with totals*******************////
        timer = setInterval(function () {
            miss++
            wrong(x);
            clearInterval(int)
           
            setTimeout(function () {
                if (x < ($question.$answer.length - 1)) {
                  
                    clearInterval(int)
                    x++

                    questionArray(x)

                    return x

                }
                else {
                    clearInterval(timer)
                    clearInterval(int)
                    $("#picture").hide();
                    $("#question").html("You finished the quiz! Click back to try again!")
                    $("#option1").html("Answers you got right: " + wins).removeClass("change")
                    $("#option2").html("Answers You got wrong: " + losses).removeClass("change")
                    $("#timeRemaining").html("")
                    $("#option3").html("Answers you missed: " + miss).removeClass("change")
                    $("#goBackButton").show()
                    clearInterval(int)
                }


            }, 5000)

        }, 32000)

//hides the button on start button click
        $start.hide()
        



////**************************Code to run the game and go through the questions************************////    

        var option_clicked;

        questionArray(x)

//whem an option is clicked will check if it matches the correct answer or not
        $(document).on("click", ".option", function (e) {
            option_clicked = e.target.textContent
            clearInterval(timer);
            clearInterval(int)
            // if the answer is right will add one to wins display winning message and start timer again
            if ($question.$answer[x] == option_clicked) {
                right(x)
                wins++

                setTimeout(function () {
                    clearInterval(int)
                    clearInterval(timer)
                    if (x < ($question.$answer.length - 1)) {
                        x++

                        questionArray(x)



                    //timer that will add one to miss and generate another question if nothing is clicked
                        timer = setInterval(function () {
                            miss++
                            wrong(x);
                            clearInterval(int)
                            
                            setTimeout(function () {
                                if (x < ($question.$answer.length - 1)) {

                                    clearInterval(int)
                                    x++

                                    questionArray(x)

                                    return x

                                }
                                //displays ending and totals  
                                else {
                                    clearInterval(timer)
                                    clearInterval(int)
                                    $("#picture").hide();
                                    $("#question").html("You finished the game! Click back to try again or pick a new character.")
                                    $("#option1").html("Answers you got right: " + wins).removeClass("change")
                                    $("#option2").html("Answers You got wrong: " + losses).removeClass("change")
                                    $("#timeRemaining").html("")
                                    $("#option3").html("Answers you missed: " + miss).removeClass("change")
                                    $("#goBackButton").show()
                                }


                            }, 5000)

                        }, 32000)


                        return x

                    }
                    else {
                        clearInterval(int)
                        clearInterval(timer)
                        $("#picture").hide();
                        $("#question").html("You finished the quiz! Click back to try again!")
                        $("#option1").html("You got " + wins + " correct!").removeClass("change")
                        $("#option2").html("You got " + losses + " wrong.").removeClass("change")
                        $("#timeRemaining").html("")
                        $("#option3").html("You missed clicking " + miss + " answers.").removeClass("change")
                        $("#goBackButton").show()
                    }



                }, 5000)

            }
            else {
                wrong(x)
                losses++
                setTimeout(function () {

                    clearInterval(int)
                    clearInterval(timer)

                    if (x < ($question.$answer.length - 1)) {
                        x++

                        questionArray(x)




                        timer = setInterval(function () {
                            miss++
                            wrong(x);
                            clearInterval(int)
                            countDown(30)
                            setTimeout(function () {
                                if (x < ($question.$answer.length - 1)) {

                                    clearInterval(int)
                                    x++

                                    questionArray(x)

                                    return x

                                }
                                //displays ending and totals  
                                else {
                                    clearInterval(timer)
                                    clearInterval(int)
                                    $("#picture").hide();
                                    $("#question").html("You finished the quiz! Click back to try again!")
                                    $("#option1").html("Answers you got right: " + wins).removeClass("change")
                                    $("#option2").html("Answers You got wrong: " + losses).removeClass("change")
                                    $("#timeRemaining").html("")
                                    $("#option3").html("Answers you missed: " + miss).removeClass("change")
                                    $("#goBackButton").show()
                                }


                            }, 5000)

                        }, 32000)


                        return x
                    
                    }
                //displays ending and totals  
                    else {
                        clearInterval(int)
                        clearInterval(timer)
                        $("#picture").hide();
                        $("#question").html("You finished the quiz! Click back to try again!")
                        $("#option1").html("You got " + wins + " correct!").removeClass("change")
                        $("#option2").html("You got " + losses + " wrong.").removeClass("change")
                        $("#timeRemaining").html("")
                        $("#option3").html("You missed clicking " + miss + " answers.").removeClass("change")
                        $("#goBackButton").show()
                    }


                }, 5000)
            }
        })

    })

////////////////////////////////////////////////////////////////////////////////////////////////////



});
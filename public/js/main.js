                        function RightMove() {

                            myMusic = new sound("/Drip.wav");
                            myMusic.play();
                            value.x = +document.getElementsByTagName("circle")[15].getAttribute("cx");
                            temp = +document.getElementsByTagName("circle")[15].getAttribute("cx") + +110;
                            check(1);
                            //print();
                            if (temp >= 380)
                            {
                                temp = 50;
                            }

                            anime({
                                targets: value,
                                x: temp,
                                duration: 300,
                                autoplay: true,
                                update: function () {
                                    document.getElementsByTagName("circle")[15].setAttribute("cx", value.x);



                                },
                                easing: 'easeInOutSine'
                            });


                        }
                        function LeftMove()
                        {

                            temp = document.getElementsByTagName("circle")[15].getAttribute("cx");

                            myMusic = new sound("/Drip.wav");
                            myMusic.play();

                            value.x = document.getElementsByTagName("circle")[15].getAttribute("cx");
                            temp = temp - 110;
                            check(-1);
                            //print();
                            if (temp < 0)
                            {
                                temp = 270
                            }

                            anime({
                                targets: value,
                                x: temp,
                                duration: 300,
                                autoplay: true,
                                update: function () {
                                    console.log("SS" + value.x);

                                    document.getElementsByTagName("circle")[15].setAttribute("cx", value.x);



                                },
                                easing: 'easeInOutSine'
                            });
                        }
                        function DownMove()
                        {
                            temp = document.getElementsByTagName("circle")[15].getAttribute("cy");

                            myMusic = new sound("/Drip.wav");
                            myMusic.play();

                            value.x = document.getElementsByTagName("circle")[15].getAttribute("cy");
                            temp = +document.getElementsByTagName("circle")[15].getAttribute("cy") + +110;
                            console.log(temp);
                            if (temp > 490)
                            {
                                temp = 50;
                            }
                            check(-2);
                            //print();


                            anime({
                                targets: value,
                                x: temp,
                                duration: 300,
                                autoplay: true,
                                update: function () {


                                    document.getElementsByTagName("circle")[15].setAttribute("cy", value.x);




                                },
                                easing: 'easeInOutSine'
                            });
                        }
                        function UpMove()
                        {
                            temp = document.getElementsByTagName("circle")[15].getAttribute("cy");

                            myMusic = new sound("/Drip.wav");
                            myMusic.play();

                            value.x = document.getElementsByTagName("circle")[15].getAttribute("cy");
                            temp = +document.getElementsByTagName("circle")[15].getAttribute("cy") - 110;
                            if (temp < 50)
                            {
                                temp = 490;
                            }
                            check(2);
                            //print();


                            anime({
                                targets: value,
                                x: temp,
                                duration: 300,
                                autoplay: true,
                                update: function () {


                                    document.getElementsByTagName("circle")[15].setAttribute("cy", value.x);




                                },
                                easing: 'easeInOutSine'
                            });

                        }
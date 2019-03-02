//initial getting ng sched ni priest
    secretariatRouter.post('/transaction-marriage/availablepriests', (req, res)=>{
        //auto assign, available, not available. 
        console.log(req.body)
        var getEventInfo = `SELECT * from tbl_eventinfo where int_eventinfoID = ?`
        db.query(getEventInfo, [req.body.id],(err, results, fields) => {
            if (err) console.log(err);
            var eventInfo = results[0]
            console.log(eventInfo)

            
        //kunin muna natin yung available and unavailable priests. 




        var getNext =`SELECT * from tbl_priestsequence
        join tbl_user on tbl_priestsequence.int_priestID = tbl_user.int_userID
        where tbl_priestsequence.int_eventID = 5 and tbl_priestsequence.char_seqstatus = 'Next'`
        db.query(getNext, (err, results, fields) => {
            if (err) console.log(err);
            var nextPriest = results[0]
            console.log('Next Priest')
            console.log(nextPriest)

        //check if available si next priest
        var getNextSchedule =`SELECT * from tbl_schedule where int_userID = ? and date_sched=? and time_schedstart = ?`
        db.query(getNextSchedule, [nextPriest.int_userID, eventInfo.date_eventdate, eventInfo.time_eventstart], (err, results1, fields) => {
            if (err) console.log(err);
            var nextPriestSchedule = results1;
            console.log('Next priest schedule, kung meron')
            console.log(nextPriestSchedule)

            
            if(nextPriestSchedule.length ==0){
                console.log('NEXT PRIEST IS AVAILABLE')
                res.send({availablepriests:results, nextpriest: nextPriest})
            }

            if(nextPriestSchedule.length !=0){
                console.log('NEXT PRIEST IS NOT AVAILABLE')
                // select all priest, loop kung sino yung magiging available
                var queryString1 =`SELECT * from tbl_user where char_usertype = 'Priest' 
                or char_usertype = 'Parish Priest'`
                db.query(queryString1, (err, results, fields) => {
                var priests = results;
                var seqcounter =1; 
                var stopper =0;
                console.log('priestsssssssssssssss')
                console.log(priests)
                for(i=0; i< priests.length; i++){
                    console.log('nakapasok na sa for')

                    var getNexttonext =`SELECT * from tbl_priestsequence
                    join tbl_user on tbl_priestsequence.int_priestID = tbl_user.int_userID
                    where tbl_priestsequence.int_eventID = 5 and tbl_user.int_userID =?`

                    db.query(getNexttonext, [priests[i].int_userID],(err, results, fields) => {
                        if (err) console.log(err);
                        var nexttonext = results;
                        console.log('next to next daw')
                        console.log(nexttonext)
                        //kung itong priest na to yung next
                        console.log(nextPriest.int_seqnumber+seqcounter)
                        var sequencecountertotal
                        if(sequencecountertotal!=nexttonext[0].int_seqnumber){
                            //kunin yung sched kung available
                            console.log('pumasok na sa if')
                            console.log('NEXT TO NEXT PRIEST SELECTED')
                            var getNextSchedule =`SELECT * from tbl_schedule where int_userID = ? and date_sched=? and time_schedstart = ?`
                            db.query(getNextSchedule, [nexttonext[0].int_userID, eventInfo.date_eventdate, eventInfo.time_eventstart], (err, results, fields) => {
                            if(err) console.log(err)
                            var nexttonextsched= results;
                            
                            //kung available sya
                            if(nexttonextsched.length ==0){
                                console.log('NEXT PRIEST IS AVAILABLE')
                                res.send({availablepriests:results, nextpriest: nexttonext[0]})
                                stopper =1
                            }

                            //kung hindi available
                            if(nexttonextsched.length !=0){
                                console.log('NEXT PRIEST IS NOT AVAILABLE')
                                //select naman yung next sa priest na to
                                seqcounter++
                            }
                            
                            })
                        }//kung sya yung next


                        else{
                            seqcounter++
                        }
                    })

                    if(stopper ==1){
                        break
                    }

                }
                });//priests

            }

            // console.log(results[0])
        });//getNextSchedule
    });//getnext
    
    });//geteventinfo
    });//post
import React, { useState } from 'react';
import { questionPropsTypes } from './../Types/quiz_types'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init(
    {
        duration: 2000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
    }
);

const QuestionCard: React.FC<questionPropsTypes> = (
    {
        question,
        options,
        callback
    }
) => {
    
    let [selectedAns, setSelectedAns] = useState("")
    // console.log(question, options)
    const handleSelection = (ev: any) => {
        setSelectedAns(ev.target.value);
    }
    
    return (
        <Container maxWidth="sm" className="container">
            <div className="question-container">
                <Paper elevation={3} className="Paper" data-aos="fade-up">
                    <div className="question">
                        <h3>{question}</h3>
                    </div>
                    <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}>
                        {
                            options.map((opt: string, ind: number) => {
                                return (
                                    <div key={ind} className='lable' data-aos="fade-right">
                                        <label className="blue">
                                            <Radio 
                                                className="radio"
                                                name="opt"
                                                value={opt}
                                                required
                                                checked={selectedAns === opt}
                                                onChange={handleSelection}
                                            />
                                            {opt}
                                        </label>
                                    </div>
                                )
                            })
                        }
        
                        <Button type="submit" variant="outlined" color="secondary" className="Button">Submit</Button>
                    </form>
                </Paper >
        </div>

        </Container>

    )
}

export default QuestionCard;
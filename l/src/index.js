import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import './index.css';
import { useCookies } from 'react-cookie';
var seedrandom = require('seedrandom');
var audio;
class MCVocabularyQuestion {
    constructor(phrase, answerOptions, correctAnswer, qualleish = false) {
        this.phrase = phrase;
        this.answerOptions = answerOptions;
        this.correctAnswer = correctAnswer;
        this.qualleish = qualleish;

        this.optionIDsMap = new Map(answerOptions.map(option => [option, `option${nanoid()}`]));
    }

    pronounce() {
        // Bad code:
        if (this.qualleish === true) {
            const splitted = this.phrase.split(" ");
            audio = new Audio(splitted[0].toLowerCase().replace("?", "").replace(",", "").replace("!", "").replace(".", "") + '.wav');
            audio.play();
            audio.addEventListener("ended", function () {
                if (splitted.length > 1) {
                    audio = new Audio(splitted[1].toLowerCase().replace("?", "").replace(",", "").replace("!", "").replace(".", "") + '.wav');
                    audio.play();
                    audio.addEventListener("ended", function () {
                        if (splitted.length > 2) {
                            audio = new Audio(splitted[2].toLowerCase().replace("?", "").replace(",", "").replace("!", "").replace(".", "") + '.wav');
                            audio.play();
                            audio.addEventListener("ended", function () {
                                if (splitted.length > 3) {
                                    audio = new Audio(splitted[3].toLowerCase().replace("?", "").replace(",", "").replace("!", "").replace(".", "") + '.wav');
                                    audio.play();
                                    audio.addEventListener("ended", function () {
                                        if (splitted.length > 4) {
                                            audio = new Audio(splitted[4].toLowerCase().replace("?", "").replace(",", "").replace("!", "").replace(".", "") + '.wav');
                                            audio.play();
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    }

    displayQuestion(handleNextQuestionMethod) {
        return (
            <div id="parent">
                <button onClick={() => this.pronounce()}>Pronounce</button>
                <MCVocabularyQuestionDisplay
                    vocabularyPhrase={this.phrase}
                    answerOptions={this.answerOptions}
                    optionIDsMap={this.optionIDsMap}
                    correctAnswer={this.correctAnswer}
                    handleNextQuestion={handleNextQuestionMethod} />
            </div>
        );
    }
}

class MCSentenceQuestion {
    constructor(sentence, answerOptions, correctAnswer) {
        this.sentence = sentence;
        this.answerOptions = answerOptions;
        this.correctAnswer = correctAnswer;

        this.optionIDsMap = new Map(answerOptions.map(option => [option, `option${nanoid()}`]));
    }

    displayQuestion(handleNextQuestionMethod) {
        return (
            <MCSentenceQuestionDisplay
                sentence={this.sentence}
                answerOptions={this.answerOptions}
                optionIDsMap={this.optionIDsMap}
                correctAnswer={this.correctAnswer}
                handleNextQuestion={handleNextQuestionMethod} />
        );
    }
}

class AssemblingTranslationQuestion {
    constructor(sentence, wordOptions, translation) {
        this.sentence = sentence;
        this.wordOptions = wordOptions.sort(() => Math.random() - 0.5);
        this.translation = translation;

        this.optionIDsMap = new Map(wordOptions.map(option => [option, `option${nanoid()}`]));
    }

    displayQuestion(handleNextQuestionMethod) {
        return (
            <AssemblingTranslationQuestionDisplay
                sentence={this.sentence}
                wordOptions={this.wordOptions}
                optionIDsMap={this.optionIDsMap}
                translation={this.translation}
                handleNextQuestion={handleNextQuestionMethod} />
        );
    }
}

class AudioHearQuestion {
    constructor(sentence, meaning) {
        this.sentence = sentence;
        this.meaning = meaning;
    }

    displayQuestion(handleNextQuestionMethod) {
        return (
            <div>
                <AudioHearQuestionDisplay
                    sentence={this.meaning}
                    answer={this.sentence}
                    handleNextQuestion={handleNextQuestionMethod} />
            </div>
        );
    }
}

class WritingTranslationQuestion {
    constructor(sentence, translation) {
        this.sentence = sentence;
        this.translation = translation;
    }

    displayQuestion(handleNextQuestionMethod) {
        return (
            <WritingTranslationQuestionDisplay
                sentence={this.sentence}
                answer={this.translation}
                handleNextQuestion={handleNextQuestionMethod} />
        );
    }
}

class PairsQuestion {
    constructor(firstLanguageWords, targetLanguageWords, matches) {
        this.firstLanguageWords = firstLanguageWords.sort(() => Math.random() - 0.5);
        this.targetLanguageWords = targetLanguageWords.sort(() => Math.random() - 0.5);
        this.matches = matches;

        this.optionIDsMap = new Map((firstLanguageWords.concat(targetLanguageWords)).map(option => [option, `option${nanoid()}`]));
    }

    displayQuestion(handleNextQuestionMethod) {
        return (
            <PairsQuestionDisplay
                firstLanguageWords={this.firstLanguageWords}
                targetLanguageWords={this.targetLanguageWords}
                matches={this.matches}
                optionIDsMap={this.optionIDsMap}
                handleNextQuestion={handleNextQuestionMethod} />
        );
    }
}

class LessonInformation {
    constructor(lessonName, questionsArray) {
        this.lessonName = lessonName;
        this.name = this.lessonName;
        var nouns, adjectives, adverbs, words, things;
        var nounseng, adjectiveseng, adverbseng, wordseng, thingseng;
        //
        nouns = ["fogel", "nu?? ph??", "nu??", "yo", "yo ph??", "ch??", "od ch??", "h??ro", "ch??a", "fogela", '???ia', 't??y'];
        adjectives = ["casa", "hanya"];
        adverbs = ["gh??", "corzo", "es", "mu??", "es kong"];
        things = ['???ia', 't??y', 'n?? unas', 'ca h??na'];
        words = ["con", 'ca'];
        //
        nounseng = ["bird", "woman", "man", "king", "queen", "child", "adult", "horse", "children", "birds", 'i', 'you'];
        adjectiveseng = ["cool", "amazing"];
        adverbseng = ["hates", "loves", "is", "wants", "is not"];
        thingseng = ['me', 'you', 'no one', 'the dog'];
        wordseng = ["a(n)", "the"]
        this.questionsArray = questionsArray;
        //var rand0, rand1, rand2, rand3, rand4, rand5
        //this.questionsArray = [];
        //for (var i = 0; i < 6; i++) {
        //    var rng = seedrandom(this.lessonName + i);
        //    var a = -1;
        //    a++;
        //    var rnag = seedrandom(this.lessonName + (i + a));
        //    rand0 = Math.floor(rnag() * words.length);
        //    rand1 = Math.floor(rnag() * adjectives.length);
        //    rand2 = Math.floor(rnag() * nouns.length);
        //    rand3 = Math.floor(rnag() * adverbs.length);
        //    rand4 = Math.floor(rnag() * things.length);
        //    rand5 = Math.floor(rnag() * adverbs.length);
        //    var rand7 = Math.floor(rng() * 3);

        //    if (rand0 === 0 && nouns[rand2].endsWith("a")) {
        //        rand0 = 1;
        //    }

        //    rand0 = Math.min(rand0, words.length);
        //    rand1 = Math.min(rand1, adjectives.length);
        //    rand2 = Math.min(rand2, nouns.length);
        //    rand3 = Math.min(rand3, adverbs.length);
        //    rand4 = Math.min(rand4, things.length);
        //    rand5 = Math.min(rand5, adverbs.length);

        //    //                var randCol = [rand1,rand2,rand3,rand4,rand5];
        //    //                var i = randGen();
        //    if (rand7 < 2) {        // if < 2 add another word after
        //        var content = words[rand0] + " " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3] + " " + things[rand4];
        //        var content_w1 = words[rand0] + " " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3] + " " + adjectives[Math.min(rand4, adjectives.length)];
        //        var content_w2 = words[rand0] + " " + nouns[Math.min(rand1, nouns.length)] + " " + nouns[rand2] + " " + adverbs[Math.min(rand3, adverbs.length)] + " " + adverbs[rand5];
        //        var content_w3 = words[rand0] + " " + adjectives[rand2] + " " + nouns[rand1] + " " + nouns[rand3] + " " + things[rand4];
        //        var contenteng = wordseng[rand0] + " " + adjectiveseng[rand1] + " " + nounseng[rand2] + " " + adverbseng[rand3] + " " + thingseng[rand4];
        //        if (words[rand0] === "con") {
        //            contenteng = ((adjectiveseng[rand1].startsWith("a") || adjectiveseng[rand1].startsWith("i") || adjectiveseng[rand1].startsWith("e") || adjectiveseng[rand1].startsWith("o") || adjectiveseng[rand1].startsWith("u")) ? "an" : "a") + " " + adjectiveseng[rand1] + " " + nounseng[rand2] + " " + adverbseng[rand3] + " " + thingseng[rand4];
        //        }
        //        // Random for index
        //        var randItems = Math.floor(rng() * 6);
        //        if (randItems === 1) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content, content_w1, content_w2, content_w3], 1));
        //        } else if (randItems === 2) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content_w1, content, content_w2, content_w3], 2));
        //        } else if (randItems === 3) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content_w1, content_w2, content, content_w3], 3));
        //        } else if (randItems === 4) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content_w1, content_w2, content_w3, content], 4));
        //        } else if (randItems === 5) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content, content_w2, content_w1, content_w3], 1));
        //        }
        //    } else {
        //        var content = words[rand0] + " " + adjectives[rand1] + " " + nouns[rand2] + " " + adverbs[rand3];
        //        var content_w1 = words[rand0] + " " + adjectives[rand1] + " " + words[Math.min(rand2, words.length)] + " " + adverbs[rand3];
        //        var content_w2 = words[rand0] + " " + nouns[Math.min(rand0, nouns.length)] + " " + nouns[Math.min(rand2, nouns.length)] + " " + adverbs[rand3];
        //        var content_w3 = words[rand0] + " " + adjectives[Math.min(rand2, adjectives.length)] + " " + nouns[Math.min(rand1, nouns.length)] + " " + adverbs[rand3];
        //        var contenteng = wordseng[rand0] + " " + adjectiveseng[rand1] + " " + nounseng[rand2] + " " + adverbseng[rand3];
        //        if (words[rand0] === "con") {
        //            contenteng = ((adjectiveseng[rand1].startsWith("a") || adjectiveseng[rand1].startsWith("i") || adjectiveseng[rand1].startsWith("e") || adjectiveseng[rand1].startsWith("o") || adjectiveseng[rand1].startsWith("u")) ? "an" : "a") + " " + adjectiveseng[rand1] + " " + nounseng[rand2] + " " + adverbseng[rand3];
        //        }
        //        // Random for index
        //        var randItems = Math.floor(rng() * 6);
        //        if (randItems === 1) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content, content_w1, content_w2, content_w3], 1));
        //        } else if (randItems === 2) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content_w1, content, content_w2, content_w3], 2));
        //        } else if (randItems === 3) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content_w1, content_w2, content, content_w3], 3));
        //        } else if (randItems === 4) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content_w1, content_w2, content_w3, content], 4));
        //        } else if (randItems === 5) {
        //            this.questionsArray.push(new MCVocabularyQuestion(contenteng, [content, content_w2, content_w1, content_w3], 1));
        //        }
        //    }
        //}
    }
}

class LessonTopBar extends React.Component {
    render() {
        const questionNumber = this.props.questionNumber;

        return (
            <div>
                <div>
                    Quit Lesson
                </div>
                <div>
                    Question {questionNumber}
                </div>
            </div>
        );
    }
}

class AudioAnswerFeedback extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this); // When submit clicked
    }

    handleClick() {
        this.props.handleNextQuestion();
    }

    render() {
        const userAnswer = this.props.userAnswer;
        const correctAnswer = this.props.correctAnswer;
        const answerWasSubmitted = this.props.answerWasSubmitted;

        let feedbackArea;
        if (!answerWasSubmitted) {
            feedbackArea =
                <div> <input type="submit" value="Submit Answer" /> </div>;
        } else {
            if (userAnswer !== correctAnswer) {
                const audioElem = new Audio('audio_wrong.mp3');
                audioElem.play();
            }
            else {
                const audioElem = new Audio('audio_correct.mp3');
                audioElem.play();
            }
            feedbackArea = (
                <div>
                    <div> {(userAnswer === correctAnswer) ? 'Correct\nMeaning: ' + this.props.meaningAnswer : 'Incorrect, it was ' + correctAnswer} </div>
                    <div> <button onClick={this.handleClick}>Continue</button> </div>
                </div>
            );
        }

        return (
            <section>{feedbackArea}</section>
        );
    }
}

class AnswerFeedback extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this); // When submit clicked
    }

    handleClick() {
        this.props.handleNextQuestion();
    }

    render() {
        const userAnswer = this.props.userAnswer;
        const correctAnswer = this.props.correctAnswer;
        const answerWasSubmitted = this.props.answerWasSubmitted;

        let feedbackArea;
        if (!answerWasSubmitted) {
            feedbackArea =
                <div> <input type="submit" value="Submit Answer" /> </div>;
        } else {
            if (userAnswer !== correctAnswer) {
                const audioElem = new Audio('audio_wrong.mp3');
                audioElem.play();
            }
            else {
                const audioElem = new Audio('audio_correct.mp3');
                audioElem.play();
            }
            feedbackArea = (
                <div>
                    <div> {(userAnswer === correctAnswer) ? 'Correct' : 'Incorrect, it was ' + correctAnswer} </div>
                    <div> <button onClick={this.handleClick}>Continue</button> </div>
                </div>
            );
        }

        return (
            <section>{feedbackArea}</section>
        );
    }
}

class MCQuestionDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
    }

    handleInputChange(event) {
        this.props.handleInputChange(parseInt(event.target.value, 10));
    }

    handleSubmit(event) {
        this.props.handleSubmit();
        event.preventDefault();
    }

    handleNextQuestion() {
        this.props.handleNextQuestion();
    }

    render() {
        const options = this.props.answerOptions;
        const optionIDsMap = this.props.optionIDsMap;
        const correctAnswer = this.props.correctAnswer;
        const selection = this.props.answerSelection;
        const answerWasSubmitted = this.props.answerWasSubmitted;
        const instructions = this.props.instructions;
        const optionItems = options.map((optionText, number) =>
            <li key={optionIDsMap.get(optionText)}>
                <label>
                    {optionText}
                    <input
                        type="radio"
                        name="answerOption"
                        value={(number + 1)}
                        checked={((number + 1) === selection)}
                        onChange={this.handleInputChange} />
                </label>
            </li>
        );

        return (
            <form onSubmit={this.handleSubmit}>
                <section>
                    {instructions}
                    <fieldset>
                        <legend>Select</legend>
                        <ul>
                            {optionItems}
                        </ul>
                    </fieldset>
                </section>
                <AnswerFeedback
                    userAnswer={selection}
                    answerWasSubmitted={answerWasSubmitted}
                    correctAnswer={correctAnswer}
                    handleNextQuestion={this.handleNextQuestion} />
            </form>
        );
    }
}

class MCVocabularyQuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { answerSelection: 0, answerWasSubmitted: false };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
    }

    handleInputChange(selection) {
        this.setState({ answerSelection: selection });
    }

    handleSubmit() {
        this.setState({ answerWasSubmitted: true });
    }

    handleNextQuestion() {
        this.setState({ answerSelection: 0, answerWasSubmitted: false });
        this.props.handleNextQuestion();
    }

    render() {
        const vocabularyPhrase = this.props.vocabularyPhrase;
        const options = this.props.answerOptions;
        const optionIDsMap = this.props.optionIDsMap;
        const correctAnswer = this.props.correctAnswer;
        const selection = this.state.answerSelection;
        const answerWasSubmitted = this.state.answerWasSubmitted;
        const instructions = <p>{`${vocabularyPhrase}`}</p>;

        return (
            <MCQuestionDisplay
                answerOptions={options}
                optionIDsMap={optionIDsMap}
                correctAnswer={correctAnswer}
                answerSelection={selection}
                answerWasSubmitted={answerWasSubmitted}
                instructions={instructions}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleNextQuestion={this.handleNextQuestion} />
        );
    }
}

class MCSentenceQuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { answerSelection: 0, answerWasSubmitted: false };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
    }

    handleInputChange(selection) {
        this.setState({ answerSelection: selection });
    }

    handleSubmit() {
        this.setState({ answerWasSubmitted: true });
    }

    handleNextQuestion() {
        this.props.handleNextQuestion();
    }

    render() {
        const sentence = this.props.sentence;
        const options = this.props.answerOptions;
        const optionIDsMap = this.props.optionIDsMap;
        const correctAnswer = this.props.correctAnswer;
        const selection = this.state.answerSelection;
        const answerWasSubmitted = this.state.answerWasSubmitted;
        const instructions = <div><h1>Select the correct translation</h1><p>{sentence}</p></div>;

        return (
            <MCQuestionDisplay
                answerOptions={options}
                optionIDsMap={optionIDsMap}
                correctAnswer={correctAnswer}
                answerSelection={selection}
                answerWasSubmitted={answerWasSubmitted}
                instructions={instructions}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                handleNextQuestion={this.handleNextQuestion} />
        );
    }
}

class AssemblingTranslationQuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userAnswer: [], answerWasSubmitted: false };

        this.handleAddWord = this.handleAddWord.bind(this);
        this.handleRemoveWord = this.handleRemoveWord.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clicked = [];
        this.done = 0;
        ;
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
    }

    handleNextQuestion() {
        this.setState({ userAnswer: '', answerWasSubmitted: false });
        this.props.handleNextQuestion();
    }

    handleAddWord(event) {
        const updatedAnswer = this.state.userAnswer.concat(event.target.value);
        this.clicked.push(event.target.id);
        this.setState({ userAnswer: updatedAnswer });
    }

    handleRemoveWord(event) {
        const updatedAnswer = this.state.userAnswer.filter((word) => word !== event.target.value);
        this.clicked = this.clicked.filter(function (f) { return f !== event.target.id });
        this.setState({ userAnswer: updatedAnswer });
    }

    handleSubmit(event) {
        this.setState({ answerWasSubmitted: true });
        event.preventDefault();
    }

    render() {
        const sentence = this.props.sentence;
        const translation = this.props.translation;
        const wordOptions = this.props.wordOptions;
        const optionIDsMap = this.props.optionIDsMap;

        const userAnswer = this.state.userAnswer;
        const userAnswerSentence = `${userAnswer.join(' ')}.`;
        const userAnswerWordButtons = this.clicked.map((word, index) =>
            <button
                onClick={this.handleRemoveWord}
                key={`user${optionIDsMap.get(word)}`}
                id={word.toString()}
                type="button"
                value={wordOptions[word]}>
                {wordOptions[word]}
            </button>
        );
        const wordOptionButtons = wordOptions.map((word, index) =>
            <button
                onClick={this.handleAddWord}
                key={optionIDsMap.get(word)}
                value={word}
                type="button"
                id={index}
                disabled={this.clicked.includes(index.toString())}>
                {word}
            </button>
        );
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Translate this sentence</h1>
                <p>{sentence}</p>
                <div>
                    {userAnswerWordButtons}
                </div>
                <div>
                    {wordOptionButtons}
                </div>
                <AnswerFeedback
                    userAnswer={userAnswerSentence}
                    answerWasSubmitted={this.state.answerWasSubmitted}
                    correctAnswer={translation}
                    handleNextQuestion={this.handleNextQuestion} />
            </form>
        );
    }
}

class WritingTranslationQuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userAnswer: '', answerWasSubmitted: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
    }

    handleNextQuestion() {
        this.setState({ userAnswer: '', answerWasSubmitted: false });
        this.props.handleNextQuestion();
    }

    handleChange(event) {
        this.setState({ userAnswer: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ answerWasSubmitted: true });
        event.preventDefault();
    }

    render() {
        const sentence = this.props.sentence;
        const answer = this.props.answer;
        return (
            <div id="parent">
                <form onSubmit={this.handleSubmit}>
                    <h1>Translate this sentence</h1>
                    <p>{sentence}</p>
                    <div>
                        <label>
                            Write answer:
                            <textarea value={this.state.answerText} onChange={this.handleChange} id="answ" rows="10" cols="50" />
                        </label>
                        <br />
                    </div>
                    <AnswerFeedback
                        userAnswer={this.state.userAnswer.toLowerCase()}
                        answerWasSubmitted={this.state.answerWasSubmitted}
                        correctAnswer={answer.toLowerCase()}
                        handleNextQuestion={this.handleNextQuestion} />
                </form>
                <EasyButtons />
            </div>
        );
    }
}

function playAudio(word) {
    return new Promise((resolve) => {
        if (word === "con") {   // Windows does not like "con" as filename
            word = "__con";
        }
        let audio = new Audio(word.toLowerCase().replace("?", "").replace(",", "").replace("!", "").replace(".", "") + '.wav');
        audio.play();
        audio.addEventListener("ended", () => {
            resolve();
        });
    })
}

class AudioHearQuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userAnswer: '', answerWasSubmitted: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
    }

    handleNextQuestion() {
        this.setState({ userAnswer: '', answerWasSubmitted: false });
        this.props.handleNextQuestion();
    }

    handleChange(event) {
        this.setState({ userAnswer: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ answerWasSubmitted: true });
        event.preventDefault();
    }
    togglePlay = () => {
        var splitted = this.props.answer.split(" ");
        (async () => {
            for (var word of splitted) {
                await playAudio(word);
            }
        })();
    }
    render() {
        const answer = this.props.answer;
        const sentence = this.props.sentence;
        return (
            <div id="parent">
                <form onSubmit={this.handleSubmit}>
                    <button type="button" onClick={this.togglePlay}>Play</button>
                    <h1>What do you hear?</h1>
                    <div>
                        <label>
                            Write answer:
                            <textarea value={this.state.answerText} onChange={this.handleChange} id="answ" rows="10" cols="50" />
                        </label>
                        <br />
                    </div>
                    <AudioAnswerFeedback
                        userAnswer={this.state.userAnswer.toLowerCase()}
                        answerWasSubmitted={this.state.answerWasSubmitted}
                        correctAnswer={answer.toLowerCase()}
                        meaningAnswer={sentence.toLowerCase()}
                        handleNextQuestion={this.handleNextQuestion} />
                </form>
                <EasyButtons />
            </div>
        );
    }
}

class EasyButtons extends React.Component {
    render() {
        return (<div>
            <button onClick={() => document.getElementById('answ').value += '???'}>???</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
            <button onClick={() => document.getElementById('answ').value += '??'}>??</button>
        </div>);
    }
}

class PairsWordCell extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, language) {
        this.props.onClick(event.target.value, language);
    }

    render() {
        const word = this.props.word;
        const selected = this.props.selected;
        const alreadyMatched = this.props.alreadyMatched;
        const matchCorrect = this.props.matchCorrect;
        const matchIncorrect = this.props.matchIncorrect;
        const language = this.props.language;
        let classesArray = [];
        const possibleClasses = ['pairWordSelected', 'pairAlreadyMatched', 'pairMatchCorrect', 'pairMatchIncorrect'];
        [(selected && !(matchCorrect || matchIncorrect)), alreadyMatched, (selected && matchCorrect && !alreadyMatched), (selected && matchIncorrect && !alreadyMatched)].forEach((property, propertyIndex) => {
            if (property) { classesArray.push(possibleClasses[propertyIndex]) }
        }
        );
        const buttonClassNames = classesArray.join(' ');

        return (
            <th>
                <button
                    onClick={(event) => this.handleClick(event, language)}
                    value={word}
                    disabled={alreadyMatched || matchCorrect || matchIncorrect}
                    className={buttonClassNames}>
                    {word}
                </button>
            </th>
        )
    }
}

class PairsQuestionDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firstLanguageWordsMatched: [], firstLanguageSelection: '', targetLanguageSelection: '' };
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.handleWordSelection = this.handleWordSelection.bind(this);
    }

    componentDidUpdate() {
        if (document.getElementById('autocontinue')) {
            document.getElementById('autocontinue').click();
        }
    };

    handleNextQuestion() {
        this.setState({ firstLanguageWordsMatched: [], firstLanguageSelection: '', targetLanguageSelection: '' });
        this.props.handleNextQuestion();
    }

    handleContinue(event) {
        if (event.target.name === 'correctContinue') {
            let firstLWMArray = this.state.firstLanguageWordsMatched;
            firstLWMArray.push(this.state.firstLanguageSelection);
            this.setState({ firstLanguageWordsMatched: firstLWMArray, firstLanguageSelection: '', targetLanguageSelection: '' });
        } else {
            this.setState({ firstLanguageSelection: '', targetLanguageSelection: '' });
        }
    }

    handleWordSelection(word, language) {
        const selectionInFirstLanguage = (language === 'firstLanguage');
        const languageKey = (selectionInFirstLanguage ? 'firstLanguageSelection' : 'targetLanguageSelection');
        const otherLanguageWord = (selectionInFirstLanguage ? this.state.targetLanguageSelection : this.state.firstLanguageSelection);
        if (otherLanguageWord === '') {
            if (word === this.state[languageKey]) {
                this.setState({ [languageKey]: '' });
            } else {
                this.setState({ [languageKey]: word });
            }
        } else {
            this.setState({ [languageKey]: word });
        }
    }

    render() {
        const firstLanguageWords = this.props.firstLanguageWords;
        const targetLanguageWords = this.props.targetLanguageWords;
        const matches = this.props.matches;
        const optionIDsMap = this.props.optionIDsMap;
        const firstLWordsMatched = this.state.firstLanguageWordsMatched;
        const firstLanguageSelection = this.state.firstLanguageSelection;
        const targetLanguageSelection = this.state.targetLanguageSelection;
        const targetLWordsMatched = firstLWordsMatched.map(firstLWord => matches.get(firstLWord));
        const matchAttempted = !((firstLanguageSelection === '') || (targetLanguageSelection === ''));
        const matchCorrect = (matchAttempted && (targetLanguageSelection === this.props.matches.get(firstLanguageSelection)));
        const matchIncorrect = (matchAttempted && (targetLanguageSelection !== this.props.matches.get(firstLanguageSelection)));
        const allMatched = matchCorrect && (firstLWordsMatched.length >= (matches.size - 1));

        const wordButtonsTable = firstLanguageWords.map((firstLanguageWord, wordIndex) =>
            <tr key={optionIDsMap.get(firstLanguageWord)}>
                <PairsWordCell
                    word={firstLanguageWord}
                    selected={firstLanguageWord === firstLanguageSelection}
                    alreadyMatched={firstLWordsMatched.includes(firstLanguageWord)}
                    matchCorrect={matchCorrect}
                    matchIncorrect={matchIncorrect}
                    language='firstLanguage'
                    onClick={this.handleWordSelection} />
                <PairsWordCell
                    word={targetLanguageWords[wordIndex]}
                    selected={targetLanguageWords[wordIndex] === targetLanguageSelection}
                    alreadyMatched={targetLWordsMatched.includes(targetLanguageWords[wordIndex])}
                    matchCorrect={matchCorrect}
                    matchIncorrect={matchIncorrect}
                    language='targetLanguage'
                    onClick={this.handleWordSelection} />
            </tr>
        );

        let answerFeedbackArea = '';
        if (matchCorrect && !allMatched) {
            answerFeedbackArea = (<div>
                <p>Match correct!</p>
                <button name='correctContinue' id='autocontinue' onClick={this.handleContinue}>Click to continue</button>
            </div>);
        }
        if (matchIncorrect) {
            answerFeedbackArea = (<div>
                <p>Match incorrect</p>
                <button name='incorrectContinue' onClick={this.handleContinue}>Click to continue</button>
            </div>);
        }
        if (allMatched) {
            answerFeedbackArea = (<div>
                <p>Excellent!</p>
                <button onClick={this.handleNextQuestion}>Click to continue</button>
            </div>);
        }



        return (
            <div>
                <h1>Match the pairs</h1>
                <table>
                    <tbody>
                        {wordButtonsTable}
                    </tbody>
                </table>
                {answerFeedbackArea}
            </div>
        );
    }
}

class LessonDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questionNumber: 1 };

        this.handleNextQuestion = this.handleNextQuestion.bind(this);
    }

    handleNextQuestion() {
        this.setState({
            questionNumber: (this.state.questionNumber + 1)
        });
    }

    render() {
        if ((this.state.questionNumber - 1) === CURRENT_LESSON.questionsArray.length) {
            var oldValue = getCookie("level");
            setCookie("level", ++oldValue, 31);
            return (<AppDisplay />);
        }
        const currentQuestion = CURRENT_LESSON.questionsArray[(this.state.questionNumber - 1)];
        const currentQuestionDisplay = currentQuestion.displayQuestion(this.handleNextQuestion);
        return (
            <div>
                <div>
                    <LessonTopBar
                        questionNumber={this.state.questionNumber} />
                </div>
                <div>
                    {currentQuestionDisplay}
                </div>
                {
                    eval("if (document.getElementById('autocontinue'))document.getElementById('autocontinue').click();")}
            </div>
        );
    }
}

class MenusTopBar extends React.Component {
    render() {
        return (
            <div>
                <p>Learn Nopiosee</p>
                <br /><p>Copyright (c) 2022 Novixx Systems</p>
            </div>
        );
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

class LessonSelectionDisplay extends React.Component {
    constructor(props) {
        super(props);
        if (getCookie("level") == "") {
            setCookie("level", 0, 31);
        }
        this.handleClickLesson = this.handleClickLesson.bind(this);
    }

    handleClickLesson(event) {
        if (getCookie('level') >= event.target.id) { 
            this.props.onNavigationSelect('lesson', event.target.name);
        }
    }

    render() {
        return (
            <div>
                <div>Select Lesson</div>
                {lessons.map((element, i) =>
                    <div><button disabled={(getCookie('level') < i)} onClick={this.handleClickLesson} id={i} name={element.name.replaceAll(" ", "_").toUpperCase()}>{element.name}</button></div>
                )}
            </div>
        );
    }
}

class MenusBottomBar extends React.Component {
    render() {
        return (
            <p></p>
        );
    }
}

class MenuDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.handleNavigationSelect = this.handleNavigationSelect.bind(this);
    }

    handleNavigationSelect(navigationCategory, navigationSelection) {
        this.props.onNavigationSelect(navigationCategory, navigationSelection);
    }

    render() {
        return (
            <div>
                <MenusTopBar />
                <LessonSelectionDisplay onNavigationSelect={this.handleNavigationSelect} />
                <MenusBottomBar />
            </div>
        );
    }
}

class AppDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentDisplay: 'lesson-select-menu', lessonID: 'menu' };
        document.title = "Learn Nopiosee";
        this.handleNavigationSelect = this.handleNavigationSelect.bind(this);
    }

    handleNavigationSelect(navigationCategory, navigationSelection) {
        switch (navigationCategory) {
            case 'lesson':
                CURRENT_LESSON = eval(navigationSelection);
                this.setState({
                    currentDisplay: 'lesson-display',
                    lessonID: navigationSelection
                });
                break;
            case 'menu':
                this.setState({
                    currentDisplay: navigationSelection,
                    lessonID: 'menu'
                });
                break;
            default:
                this.setState({
                    currentDisplay: 'lesson-select-menu',
                    lessonID: 'menu'
                });
        }
    }

    render() {
        const currentDisplay = this.state.currentDisplay;
        let display;
        switch (currentDisplay) {
            case 'lesson-select-menu':
                display = <MenuDisplay onNavigationSelect={this.handleNavigationSelect} />;
                break;
            case 'lesson-display':
                display = <LessonDisplay
                    lessonID={this.state.lessonID} />;
                break;
            default:
                display = <MenuDisplay onNavigationSelect={this.handleNavigationSelect} />;
        }
        return (
            <div>{display}</div>
        );
    }
}
// simple
const SQ1 = new MCVocabularyQuestion('king', ['cwen', 'koning', 'gin', 'yo'], 4);
const SQ2 = new MCVocabularyQuestion('you', ['t??y', 'una', 'gy', 'yo'], 1);
const SQ3 = new MCVocabularyQuestion('queen', ['yo ph??', 'yo', 'ga', 'yo fo'], 1);
const SQ4 = new MCVocabularyQuestion('the king', ['yo yo', 'se yo', 'ca yo', 'te yo'], 3);
const SQ5 = new PairsQuestion(['queen', 'king', 'you', 'me', 'the', 'milk'], ['yo ph??', 'yo', 't??y', '???ia', 'ca', 'bana sua'],
    new Map([['queen', 'yo ph??'], ['king', 'yo'], ['you', 't??y'], ['me', '???ia'], ['the', 'ca'], ['milk', 'bana sua']]));
const SQ6 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
// end simple
// simple 2
const S2Q1 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S2Q2 = new AssemblingTranslationQuestion('The king and the queen', ['Ca', 'yo', 'y', 'ca', 'yo ph??', 't??y', 'ph??'], 'Ca yo y ca yo ph??.');
const S2Q3 = new MCVocabularyQuestion('me', ['???ia', 'yo', 't??y', 'yo ph??'], 1);
const S2Q4 = new MCVocabularyQuestion('milk', ['bana sua', 'yo', 't??y', 'yo ph??'], 1);
const S2Q5 = new WritingTranslationQuestion('Me and milk.', '???ia y bana sua.');
const S2Q6 = new MCVocabularyQuestion('???ia', ['you', 'me', 'we', 'they'], 2, true);
// end simple 2
// family
const S3Q1 = new MCVocabularyQuestion('mother', ['momo', 'ma', 'm??', 'ol'], 3);
const S3Q2 = new MCVocabularyQuestion('my mother', ['???ia m??', 'm?? par ???i', 'm?? t??y', 'yo ph??'], 2);
const S3Q3 = new AssemblingTranslationQuestion('Are you me?', ['Qi', 't??y', '???ia', 'y', 'ua', 't??y', 'ph??'], 'Qi t??y ???ia.');
const S3Q4 = new MCVocabularyQuestion('the milk', ['ca bana sua', 'yo', 't??y', 'yo ph??'], 1);
const S3Q5 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S3Q6 = new WritingTranslationQuestion('The king.', 'Ca yo.');
// end family
// family 2
const S4Q1 = new MCVocabularyQuestion('father', ['p??', 'papa', 'pa', 'ol'], 1);
const S4Q2 = new MCVocabularyQuestion('my father', ['p?? par ???i', '???ia p??', 'p?? t??y', 'yo ph??'], 1);
const S4Q3 = new AssemblingTranslationQuestion('Are you my mother?', ['Qi', 't??y', '???i', 'm??', 'y', 'par', 'tay', 'ph??'], 'Qi t??y m?? par ???i.');
const S4Q4 = new MCVocabularyQuestion('the milk', ['ca bana sua', 'yo', 't??y', 'yo ph??'], 1);
const S4Q5 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S4Q6 = new WritingTranslationQuestion('The queen.', 'Ca yo ph??.');
// end family 2
// food
const S5Q1 = new MCVocabularyQuestion('water', ['anay', 'bana sua', 'bana t??i', 'yo'], 1);
const S5Q2 = new MCVocabularyQuestion('the water', ['ca anay', 'yo', 't??y', 'yo ph??'], 1);
const S5Q3 = new AssemblingTranslationQuestion('Are you my father?', ['Qi', 't??y', '???i', 'm??', 'y', 'par', 'p??', 'ph??'], 'Qi t??y p?? par ???i.');
const S5Q4 = new MCVocabularyQuestion('the milk', ['ca bana sua', 'yo', 't??y', 'yo ph??'], 1);
const S5Q5 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S5Q6 = new WritingTranslationQuestion('The milk.', 'Ca bana sua.');
// end food
// food 2
const S6Q1 = new MCVocabularyQuestion('bread', ['bana m??', 'bana sua', 'bana', 'bred'], 1);
const S6Q2 = new MCVocabularyQuestion('the bread', ['ca bana m??', 'yo', 't??y', 'yo ph??'], 1);
const S6Q3 = new AssemblingTranslationQuestion('Are you my mother?', ['Qi', 't??y', '???i', 'm??', 'y', 'par', 't??y', 'ph??'], 'Qi t??y m?? par ???i.');
const S6Q4 = new MCVocabularyQuestion('the milk', ['ca bana sua', 'yo', 't??y', 'yo ph??'], 1);
const S6Q5 = new MCVocabularyQuestion('is', ['y', 'es', 'el', 'ka'], 2);
const S6Q6 = new WritingTranslationQuestion('The water.', 'Ca anay.');
// end food 2
// simple sentences
const S7Q1 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S7Q2 = new AssemblingTranslationQuestion('The king and the queen', ['Ca', 'yo', 'y', 'ca', 'yo ph??', 't??y', 'ph??'], 'Ca yo y ca yo ph??.');
const S7Q3 = new MCVocabularyQuestion('me', ['???ia', 'yo', 't??y', 'yo ph??'], 1);
const S7Q4 = new MCVocabularyQuestion('Is my mother my father?', ['Es m?? par ???i p?? par ???i?', 'Es p?? par ???i m?? par ???i?', 'M?? par ???i p?? par ???i?', 'Yo ph???'], 1);
const S7Q5 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S7Q6 = new WritingTranslationQuestion('The king.', 'Ca yo.');
// end simple sentences
// general sentences
const S8Q1 = new MCVocabularyQuestion('that', ['nos', 'yay', 'n??y', 'n??y'], 4);
const S8Q2 = new AssemblingTranslationQuestion('Is that my mother?', ['Es', 'n??y', '???i', 'm??', 'par', 't??y', 'ca'], 'Es n??y m?? par ???i.');
const S8Q3 = new MCVocabularyQuestion('Is that my father?', ['Es n??y p?? par ???i?', 'Es p?? par ???i m?? par ???i?', 'M?? par ???i p?? par ???i?', 'Es n??y m?? par ???i?'], 1);
const S8Q4 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S8Q5 = new MCVocabularyQuestion('this', ['nos', 'yay', 'n??y', 'n??y'], 3);
const S8Q6 = new WritingTranslationQuestion('The queen.', 'Ca yo ph??.');
// end general sentences
// general sentences 2
const S9Q1 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S9Q2 = new AssemblingTranslationQuestion('Is this my mother?', ['Es', 'n??y', '???i', 'm??', 'par', 't??y', 'ca'], 'Es n??y m?? par ???i.');
const S9Q3 = new MCVocabularyQuestion('Is this my father?', ['Es n??y p?? par ???i?', 'Es p?? par ???i m?? par ???i?', 'M?? par ???i p?? par ???i?', 'Es nay m?? par ???i?'], 1);
const S9Q4 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S9Q5 = new MCVocabularyQuestion('the', ['ka', 'es', 'ca', 'el'], 3);
const S9Q6 = new WritingTranslationQuestion('The mother.', 'Ca m??.');
// end general sentences 2
// simple words 3
const S10Q1 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S10Q2 = new AssemblingTranslationQuestion('The king and the queen', ['Ca', 'yo', 'y', 'ca', 'yo ph??', 't??y', 'ph??'], 'Ca yo y ca yo ph??.');
const S10Q3 = new MCVocabularyQuestion('me', ['???ia', 'yo', 't??y', 'yo ph??'], 1);
const S10Q4 = new MCVocabularyQuestion('Is my mother my father?', ['Es m?? par ???i p?? par ???i?', 'Es p?? par ???i m?? par ???i?', 'M?? par ???i p?? par ???i?', 'Yo ph???'], 1);
const S10Q5 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S10Q6 = new WritingTranslationQuestion('The king.', 'Ca yo.');
// end simple words 3
// general sentences 3
const S11Q1 = new MCVocabularyQuestion('not', ['nos', 'yay', 'kay', 'kong'], 4);
const S11Q2 = new AssemblingTranslationQuestion('Is that not my mother?', ['Es', 'n??y', '???i', 'm??', 'par', 't??y', 'ca', 'kong'], 'Es n??y kong m?? par ???i.');
const S11Q3 = new MCVocabularyQuestion('Is that not my father?', ['Es n??y kong p?? par ???i?', 'Es p?? par ???i m?? par ???i?', 'M?? par ???i p?? par ???i?', 'Es n??y m?? par ???i kong?'], 1);
const S11Q4 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S11Q5 = new MCVocabularyQuestion('this', ['nos', 'yay', 'n??y', 'n??y'], 3);
const S11Q6 = new MCVocabularyQuestion('that', ['nos', 'yay', 'n??y', 'n??y'], 4);
// end general sentences 3
// general sentences 4
const S12Q1 = new MCVocabularyQuestion('My child', ['Ch?? par ???i', 'Ch?? ???i', 'Ch?? par', 'Ch??'], 1);
const S12Q2 = new AssemblingTranslationQuestion('Is that my child?', ['Es', 'n??y', '???i', 'ch??', 'par', 't??y', 'ca'], 'Es n??y ch?? par ???i.');
const S12Q3 = new MCVocabularyQuestion('Is that my child?', ['Es n??y ch?? par ???i?', 'Es ch?? par ???i m?? par ???i?', 'M?? par ???i ch?? par ???i?', 'Es n??y m?? par ???i ch???'], 1);
const S12Q4 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S12Q5 = new MCVocabularyQuestion('this', ['nos', 'yay', 'n??y', 'n??y'], 3);
const S12Q6 = new MCVocabularyQuestion('that', ['nos', 'yay', 'n??y', 'n??y'], 4);
// end general sentences 4
// hard sentences 1
const S13Q1 = new MCVocabularyQuestion('That is not my child.', ['N??y ch?? par ???i m?? par ???i.', 'M?? par ???i ch?? par ???i.', 'N??y es kong ch?? par ???i.', 'N??y es m?? par ???i ch??.'], 3);
const S13Q2 = new AssemblingTranslationQuestion('That is not my child.', ['es', 'N??y', '???i', 'ch??', 'par', 't??y', 'ca', 'kong'], 'N??y es kong ch?? par ???i.');
const S13Q3 = new MCVocabularyQuestion('Is that not my child?', ['Es n??y kong ch?? par ???i?', 'Es ch?? par ???i m?? par ???i?', 'M?? par ???i ch?? par ???i?', 'Es n??y m?? par ???i ch???'], 1);
const S13Q4 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S13Q5 = new AssemblingTranslationQuestion('This is my child.', ['es', 'N??y', '???i', 'ch??', 'par', 't??y', 'ca'], 'N??y es ch?? par ???i.');
const S13Q6 = new MCVocabularyQuestion('this', ['nos', 'yay', 'n??y', 'n??y'], 3);
const S13Q7 = new MCVocabularyQuestion('that', ['nos', 'yay', 'n??y', 'n??y'], 4);
const S13Q8 = new WritingTranslationQuestion('That is my child.', 'N??y es ch?? par ???i.');
// end hard sentences 1
// hard sentences 2
const S14Q1 = new MCVocabularyQuestion('Say it', ['Grite eso', 'Grita eso', 'Eso grite', 'Eso grita'], 1);
const S14Q2 = new AssemblingTranslationQuestion('You are my father.', ['t??y', 'qi', 'p??', 'par', '???i', 'T??y', 'ca', 'Es'], 'T??y qi p?? par ???i.');
const S14Q3 = new MCVocabularyQuestion('You are not my mother.', ['T??y es kong m?? par ???i.', 'T??y es m?? par ???i.', 'T??y qi kong m?? par ???i.', 'T??y qi m?? par ???i.'], 3);
const S14Q4 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S14Q5 = new AssemblingTranslationQuestion('You are my mother.', ['t??y', 'qi', 'm??', 'par', '???i', 'T??y', 'ca', 'Es'], 'T??y qi m?? par ???i.');
const S14Q6 = new MCVocabularyQuestion('this', ['nos', 'yay', 'n??y', 'n??y'], 3);
// end hard sentences 2
// daily life 1
const S15Q1 = new MCVocabularyQuestion('I live here', ['???ia bi ??ki', 'T??y bi ??ki', 'Sa bi ??ki', 'Ca bi ??ki'], 1);
const S15Q2 = new AssemblingTranslationQuestion('I live here', ['???i', '???ia', 'bi', '??ki', 'ca', 'es', 't??y', 'T??y'], '???ia bi ??ki.');
const S15Q3 = new MCVocabularyQuestion('the', ['ka', 'ca', 'es', 'el'], 2);
const S15Q4 = new AssemblingTranslationQuestion('Do you live here?', ['???i', 'yo', 'bi', '??ki', 'ca', 'Cor', 't??y', 'T??y'], 'Cor t??y bi ??ki.');
const S15Q5 = new MCVocabularyQuestion('no', ['nee', 'nor', 'n??', 'na'], 3);
const S15Q6 = new MCVocabularyQuestion('yes', ['yay', 'y??', 'y??', 'yes'], 4);
// end daily life 1
// General answers 1
const S16Q1 = new MCVocabularyQuestion('yes', ['yes', 'y??', 'y??', 'ya'], 1);
const S16Q2 = new MCVocabularyQuestion('no', ['no', 'n??', 'na', 'nee'], 2);
const S16Q3 = new MCVocabularyQuestion('I live here', ['???ia bi ??ki', 'T??y bi ??ki', 'Sa bi ??ki', 'Ca bi ??ki'], 1);
const S16Q4 = new MCVocabularyQuestion('You live there', ['???ia bi q??', 'T??y bi q??', 'Sa bi q??', 'Ca bi ??ki'], 2);
const S16Q5 = new MCVocabularyQuestion('He lives there', ['???ia bi ??ki', 'T??y bi q??', 'El bi q??', 'Ela bi q??'], 3);
const S16Q6 = new MCVocabularyQuestion('She lives there', ['???ia bi ??ki', 'T??y bi q??', 'El bi q??', 'Ela bi q??'], 4);
// end general answers 1
// General answers 2
const S17Q1 = new MCVocabularyQuestion('She is here', ['Ela es ??ki', 'T??y es ??ki', 'Ela bi ??ki', 'El bi ??ki'], 1);
const S17Q2 = new MCVocabularyQuestion('You are here', ['El es ??ki', 'T??y qi ??ki', 'Ela bi ??ki', 'El bi ??ki'], 2);
const S17Q3 = new MCVocabularyQuestion('He is here', ['El es ??ki', 'T??y qi ??ki', 'Ela bi ??ki', 'El bi ??ki'], 1);
const S17Q4 = new MCVocabularyQuestion('I am here', ['???ia esta ??ki', 'T??y esta ??ki', 'Ela bi ??ki', 'El es bi ??ki'], 1);
const S17Q5 = new MCVocabularyQuestion('She is there', ['Ela es q??', 'T??y es q??', 'Ela bi ??ki', 'El bi ??ki'], 1);
const S17Q6 = new MCVocabularyQuestion('You are there', ['El es q??', 'T??y qi q??', 'Ela bi ??ki', 'El bi ??ki'], 2);
// end general answers 2
// greetings 1
const S18Q1 = new MCVocabularyQuestion('Hello', ['Xao hy', 'Xia hy', 'Xao yo', 'Xao ar??y'], 1);
const S18Q2 = new MCVocabularyQuestion('Are you me?', ['Cor tay ???ia?', 'Qi t??y ???ia?', 'Cor t??y ???ia?', 'Cor qi ???ia?'], 2);
const S18Q3 = new AssemblingTranslationQuestion('Hello', ['Xao', 'hy', 'yo', 't??y', 'T??y', 'ca', 'es', '???i'], 'Xao hy.');
const S18Q4 = new MCVocabularyQuestion('I am me', ['???ia esta ???ia', 'T??y es ???ia', 'Sa es ???ia', 'Ca es ???ia'], 1);
const S18Q5 = new WritingTranslationQuestion('You are not me.', 'T??y qi kong ???ia.');
const S18Q6 = new MCVocabularyQuestion('You are me', ['T??y es ???ia', 'T??y qi ???ia', 'Sa es ???ia', 'Ca es ???ia'], 2);
// end greetings 1
// greetings 2
const S19Q1 = new MCVocabularyQuestion('Welcome', ['Xao hy', 'Xia hy', 'Xao yo', 'Xao ar??y'], 4);
const S19Q2 = new MCVocabularyQuestion('I am not you', ['???ia esta kong t??y', 'T??y es t??y', 'Sa es t??y', '???ia es kong t??y'], 1);
const S19Q3 = new AssemblingTranslationQuestion('Welcome', ['Xao', 'hy', 'yo', 't??y', 'T??y', 'ca', 'es', '???i', 'ar??y'], 'Xao ar??y.');
const S19Q4 = new MCVocabularyQuestion('Hello', ['Xao hy', 'Xia hy', 'Xao yo', 'Xao ar??y'], 1);
const S19Q5 = new AssemblingTranslationQuestion('Hello', ['Xao', 'hy', 'yo', 't??y', 'T??y', 'ca', 'es', '???i'], 'Xao hy.');
const S19Q6 = new MCVocabularyQuestion('I am you', ['???ia esta t??y', 'T??y es t??y', 'Sa es t??y', '???ia es kong t??y'], 1);
// end greetings 2
// languages 1
const S20Q1 = new MCVocabularyQuestion('I speak', ['???ia grit', 'T??y grit', 'Sa grit', '???ia grita'], 1);
const S20Q2 = new MCVocabularyQuestion('Do you speak dutch?', ['Cor grit teing Neder?', 'Cor t??y grit teing Neder?', 'Cor xao grit teing Neder?', 'Cor ???ia grit teing Neder?'], 2);
const S20Q3 = new AssemblingTranslationQuestion('I speak dutch', ['???ia', 'grit', 'teing', 'Neder', 'Nederl??ns', 'qi', 'kong', 't??y'], '???ia grit teing Neder.');
const S20Q4 = new MCVocabularyQuestion('I speak english', ['???ia grit teing Eya', 'T??y grit teing Ega', 'Sa grit teing Ega', '???ia grit teing Ega'], 4);
const S20Q5 = new MCVocabularyQuestion('I do not speak dutch', ['???ia grit kong teing Neder', 'T??y cor kong grit teing Neder', 'Sa grit kong teing Neder', '???ia cor kong grit teing Neder'], 4);
const S20Q6 = new MCVocabularyQuestion('I do not speak english', ['???ia grit teing Ega', 'T??y grit kong teing Ega', 'Sa grit kong teing Ega', '???ia cor kong grit teing Ega'], 4);
// end languages 1
// languages 2
const S21Q1 = new MCVocabularyQuestion('I do not speak', ['???ia cor grit', '???ia cor kong grit', 'Cor kong grit teing Ega', 'Se cor kong grit'], 2);
const S21Q2 = new MCVocabularyQuestion('Do you speak english?', ['Cor grit teing Ega?', 'Cor t??y grit teing Ega?', 'Cor xao grit teing Ega?', 'Cor ???ia grit teing Ega?'], 2);
const S21Q3 = new AssemblingTranslationQuestion('I do not speak english', ['???ia', 'grit', 'kong', 'teing', 'Ega', 'qi', 'kong', 'cor'], '???ia cor kong grit teing Ega.');
const S21Q4 = new MCVocabularyQuestion('I do not speak dutch', ['???ia cor kong grit teing Neder', 'T??y cor kong grit teing Neder', '???ia cor grit teing Neder', 'T??y cor grit teing Neder'], 1);
const S21Q5 = new AssemblingTranslationQuestion('I do not speak dutch', ['???ia', 'grit', 'kong', 'teing', 'Neder', 'qi', 'kong', 'cor'], '???ia cor kong grit teing Neder.');
const S21Q6 = new MCVocabularyQuestion('I speak english', ['???ia grit teing Egga', 'T??y grit teing Ega', 'Sa grit teing Ega', '???ia grit teing Ega'], 4);
// end languages 2
// numbers 1
const S22Q1 = new MCVocabularyQuestion('One', ['unas', 'ula', 'one', 'een'], 1);
const S22Q2 = new MCVocabularyQuestion('Two', ['dor', 'doro', 'een', 'one'], 1);
const S22Q3 = new AssemblingTranslationQuestion('One', ['un', 'a', 's', 'unas', 'dor', 'doro', 'een', 'one'], 'unas.');
const S22Q4 = new MCVocabularyQuestion('Three', ['tr??', 'tr??ss', 'dor', 'd??ro'], 1);
const S22Q5 = new MCVocabularyQuestion('Four', ['kwar', 'kwatro', 'tres', 'tr??ss'], 1);
const S22Q6 = new AssemblingTranslationQuestion('Two', ['dor', 'o', 's', 'ula', 'dor', 'doro', 'een', 'one'], 'dor.');
// end numbers 1
// numbers 2
const S23Q1 = new MCVocabularyQuestion('Five', ['vin', 'vinss', 'kwar', 'kwatro'], 1);
const S23Q2 = new MCVocabularyQuestion('Six', ['s??ss', 's??', 'vin', 'vinas'], 2);
const S23Q3 = new AssemblingTranslationQuestion('Three', ['tr??', 's', 's', 'ula', 'dor', 'doro', 'een', 'one'], 'tr??.');
const S23Q4 = new MCVocabularyQuestion('Seven', ['s??ven', 's??pen', 's??sse', 's??a'], 1);
const S23Q5 = new MCVocabularyQuestion('Eight', ['??', 'och', 'og', 'e'], 1);
const S23Q6 = new AssemblingTranslationQuestion('Four', ['kwar', 'o', 's', 'ula', 'dor', 'doro', 'een', 'one'], 'kwar.');
// end numbers 2
// numbers 3
const S24Q1 = new MCVocabularyQuestion('Nine', ['n??ne', 'n??', 'n??a', 'n??ne'], 2);
const S24Q2 = new MCVocabularyQuestion('Ten', ['d??', 'd??ss', 'n??', 'n??ne'], 1);
const S24Q3 = new AssemblingTranslationQuestion('Five', ['vin', 's', 's', 'ula', 'dor', 'doro', 'een', 'one'], 'vin.');
const S24Q4 = new MCVocabularyQuestion('Eleven', ['d??l??', '??l??ven', 'd??', 'd??ss'], 1);
const S24Q5 = new MCVocabularyQuestion('Hundred', ['h??n', 'd??ra', 'hunda', 'h??nt'], 1);
const S24Q6 = new AssemblingTranslationQuestion('Six', ['s??', 'ula', 'dor', 'doro', 'een', 'one'], 's??.');
// end numbers 3
// people
const S25Q1 = new MCVocabularyQuestion('I hate him', ['???ia gh?? hat', '???ia hat par ell', '???ia gh?? par ell', '???ia g?? par ell'], 3);
const S25Q2 = new MCVocabularyQuestion('I love her', ['???ia gh?? corzo', '???ia corzo ela', '???ia corzo par ela', '???ia par ela corzo'], 4);
const S25Q3 = new AssemblingTranslationQuestion('I hate him', ['???ia', 'gh??', 'hat', 'him', '???ia', 'gh??', 'l??', 'her', 'par', 'ell'], '???ia gh?? par ell.');
const S25Q4 = new MCVocabularyQuestion('I love her', ['???ia gh?? corzo', '???ia corzo ela', '???ia corzo par ela', '???ia par ela corzo'], 4);
const S25Q5 = new AssemblingTranslationQuestion('I love her', ['???ia', 'gh??', 'corzo', 'her', 'par', 'ela', 'l??', 'him'], '???ia par ela corzo.');
const S25Q6 = new MCVocabularyQuestion('I hate him', ['???ia gh?? hat', '???ia hat par ell', '???ia gh?? par ell', '???ia g?? par ell'], 3);
// end people
// clothes
const S26Q1 = new MCVocabularyQuestion('I wear a hat', ['???ia veo con hat', '???ia hat par ell', '???ia beo con hat', '???ia g?? veo'], 1);
const S26Q2 = new MCVocabularyQuestion('I wear a shirt', ['???ia veo con ay', '???ia veo con shirt', '???ia veo con shir', '???ia veo con c??'], 1);
const S26Q3 = new AssemblingTranslationQuestion('I wear a hat', ['???ia', 'veo', 'con', 'hat', '???ia', 'gh??', 'l??', 'her'], '???ia veo con hat.');
const S26Q4 = new MCVocabularyQuestion('I wear a shirt', ['???ia veo con ay', '???ia veo con shirt', '???ia veo con shir', '???ia veo con c??'], 1);
const S26Q5 = new AssemblingTranslationQuestion('I wear a shirt', ['???ia', 'veo', 'con', 'shirt', '???ia', 'gh??', 'l??', 'her', 'ay'], '???ia veo con ay.');
const S26Q6 = new MCVocabularyQuestion('I wear pants', ['???ia veo con c??a', '???ia c??a', '???ia beo con c??a', '???ia c??a veo'], 1);
// end clothes
// animals
const S27Q1 = new MCVocabularyQuestion('I have a dog', ['???ia y?? con h??na', '???ia gh?? con h??na', '???ia y?? con dog', '???ia y?? h??na'], 1);
const S27Q2 = new MCVocabularyQuestion('I have a cat', ['???ia y?? con kaya', '???ia gh?? con kaya', '???ia y?? con kata', '???ia y?? kata'], 1);
const S27Q3 = new AssemblingTranslationQuestion('I have a dog', ['???ia', 'y??', 'con', 'h??na', '???ia', 'gh??', 'l??', 'her'], '???ia y?? con h??na.');
const S27Q4 = new MCVocabularyQuestion('I do not have a cat', ['???ia cor y?? con kaya', '???ia cor kong y?? con kaya', '???ia kong y?? con kaya', '???ia y?? con kata'], 2);
const S27Q5 = new AssemblingTranslationQuestion('I do not have a cat', ['???ia', 'cor', 'y??', 'con', 'kaya', '???ia', 'gh??', 'kong', 'her'], '???ia cor kong y?? con kaya.');
const S27Q6 = new MCVocabularyQuestion('I have a dog', ['???ia y?? con h??na', '???ia gh?? con h??na', '???ia y?? con dog', '???ia y?? h??na'], 1);
// end animals
// colors
const S28Q1 = new MCVocabularyQuestion('I like red', ['???ia tigh r??', '???ia tigh gr??', 'T??y tigh r??', 'T??y tigh gr??'], 1);
const S28Q2 = new MCVocabularyQuestion('I like green', ['???ia tigh gr??', '???ia tigh r??', 'T??y tigh r??', 'T??y tigh gr??'], 1);
const S28Q3 = new AssemblingTranslationQuestion('I like red', ['???ia', 'tigh', 'r??', '???ia', 'gh??', 'l??', 'her'], '???ia tigh r??.');
const S28Q4 = new MCVocabularyQuestion('I like green', ['???ia tigh gr??', '???ia tigh r??', 'T??y tigh r??', 'T??y tigh gre'], 1);
const S28Q5 = new AssemblingTranslationQuestion('I like green', ['???ia', 'tigh', 'gr??', '???ia', 'gh??', 'l??', 'her'], '???ia tigh gr??.');
const S28Q6 = new MCVocabularyQuestion('I like red', ['T??y tigh r??', '???ia tigh gr??', '???ia tigh r??', 'T??y tigh gr??'], 3);
// end colors
// food 3
const S29Q1 = new MCVocabularyQuestion('I eat bread', ['???ia an bana m??', '???ia an bana', '???ia an banh m??', '???ia an bana mi'], 1);
const S29Q2 = new MCVocabularyQuestion('I eat meat', ['???ia an mit', '???ia an f??d mit', '???ia an mita', '???ia an meat'], 2);
const S29Q3 = new AssemblingTranslationQuestion('I eat bread', ['???ia', 'an', 'bana', 'm??', '???ia', 'gh??', 'l??', 'her'], '???ia an bana m??.');
const S29Q4 = new MCVocabularyQuestion('I like eating meat', ['???ia tigh an f??d mit', '???ia tigh aning f??d mit', 'An mit', 'Tigh an mit'], 1);
const S29Q5 = new AssemblingTranslationQuestion('I like eating meat', ['???ia', 'tigh', 'an', 'f??d', 'mit', '???ia', 'gh??', 'l??', 'her'], '???ia tigh an f??d mit.');
const S29Q6 = new MCVocabularyQuestion('I eat bread', ['???ia an bana m??', '???ia an bana', '???ia an banh m??', '???ia an bana mi'], 1);
// end food 3
// hard sentences 3
const S30Q1 = new MCVocabularyQuestion('I have a dog and a cat', ['???ia y?? con h??na y con kaya', '???ia y?? con h??na kong con kaya', '???ia y?? con h??na kong kaya', '???ia y?? con kaya y h??na'], 1);
const S30Q2 = new AssemblingTranslationQuestion('I like eating meat and bread', ['???ia', 'tigh', 'an', 'f??d', 'mit', '???ia', 'gh??', 'l??', 'her', 'y', 'bana', 'm??'], '???ia tigh an f??d mit y bana m??.');
const S30Q3 = new MCVocabularyQuestion('I like eating meat and bread', ['???ia tigh an f??d mit y bana m??', '???ia tigh an f??d mit y bana', '???ia tigh an f??d mit y bana mi', '???ia tigh an f??d mit y bana m??'], 1);
const S30Q4 = new AssemblingTranslationQuestion('I have a dog and a cat', ['???ia', 'y??', 'con', 'h??na', '???ia', 'gh??', 'l??', 'her', 'y', 'con', 'kaya', 'h??na'], '???ia y?? con h??na y con kaya.');
const S30Q5 = new MCVocabularyQuestion('I am not you, but I am.', ['???ia esta kong t??y, mala ???ia esta.', '???ia esta kong ???ia, mala ???ia esta.', '???ia esta t??y, mala ???ia esta.', 'T??y qi kong t??y, mala ???ia esta'], 1);
const S30Q6 = new AssemblingTranslationQuestion('I have a dog and a cat', ['???ia', 'y??', 'con', 'kaya', '???ia', 'gh??', 'l??', 'her', 'y', 'con', 'h??na'], '???ia y?? con h??na y con kaya.');
// end hard sentences 3
// hard sentences 4
const S31Q1 = new MCVocabularyQuestion('I am not you, but I am.', ['???ia esta kong t??y, mala ???ia esta.', '???ia esta kong ???ia, mala ???ia esta.', '???ia esta t??y, mala ???ia esta.', 'T??y qi kong t??y, mala ???ia esta'], 1);
const S31Q2 = new AssemblingTranslationQuestion('I am not you, but I am.', ['???ia', 'esta', 'kong', 't??y', '???ia', 'gh??', 'l??', 'her', 'mala', 'esta'], '???ia esta kong t??y mala ???ia esta.');
const S31Q3 = new WritingTranslationQuestion('Are you not the king?', 'Qi t??y kong ca yo?');
const S31Q4 = new MCVocabularyQuestion('Are you not the king?', ['Qi t??y kong ca yo', 'Qi t??y ca yo', 'Qi t??y kong ca', 'Qi t??y ca'], 1);
const S31Q5 = new WritingTranslationQuestion('I am not you, but I am.', '???ia esta kong t??y, mala ???ia esta.');
const S31Q6 = new AssemblingTranslationQuestion('I eat the meat and I like that', ['???ia', 'an', 'mit', '???ia', 'gh??', 'l??', 'her', 'y', 'tigh', 'mit', 't??y', 'ca', 'n??y', 'f??d', 'yo'], '???ia an ca f??d mit y ???ia tigh n??y.');
// end hard sentences 4
// computers
const S32Q1 = new MCVocabularyQuestion('I have a computer', ['???ia y?? con computer', '???ia y?? con c??mputa', '???ia y?? con computa', '???ia y?? con c??mputar'], 1);
const S32Q2 = new AssemblingTranslationQuestion('I have a computer', ['???ia', 'y??', 'con', 'computer', '???ia', 'gh??', 'l??', 'her'], '???ia y?? con computer.');
const S32Q3 = new MCVocabularyQuestion('The computers', ['Ca computera', 'Ca computer', 'Ca computa', 'Ca c??mputa'], 1);
const S32Q4 = new AssemblingTranslationQuestion('The computers', ['Ca', 'computera', '???ia', 'gh??', 'l??', 'her'], 'Ca computera.');
const S32Q5 = new WritingTranslationQuestion('I have a computer.', '???ia y?? con computer.');
const S32Q6 = new MCVocabularyQuestion('I have a computer.', ['???ia y?? con computer', '???ia y?? con c??mputa', '???ia y?? con computa', '???ia y?? con c??mputar'], 1);
// end computers
// hard sentences 5
const S33Q1 = new WritingTranslationQuestion('I do not have a computer', '???ia cor kong y?? con computer');
const S33Q2 = new MCVocabularyQuestion('I do not have a computer', ['???ia cor kong y?? con computer', '???ia cor kong y?? con c??mputa', '???ia cor kong y?? con computa', '???ia cor kong y?? con c??mputar'], 1);
const S33Q3 = new AssemblingTranslationQuestion('I do not have a computer', ['???ia', 'cor', 'kong', 'y??', 'con', 'computer', '???ia', 'gh??', 'l??', 'her'], '???ia cor kong y?? con computer.');
const S33Q4 = new WritingTranslationQuestion('Do you have a computer?', 'Cor t??y y?? con computer?');
const S33Q5 = new MCVocabularyQuestion('Do you have a computer?', ['Cor t??y y?? con computer', 'Cor t??y y?? con c??mputa', 'Cor t??y y?? con computa', 'Cor t??y y?? con c??mputar'], 1);
const S33Q6 = new AssemblingTranslationQuestion('Do you have a computer?', ['Cor', 't??y', 'y??', 'con', 'computer', '???ia', 'gh??', 'l??', 'her'], 'Cor t??y y?? con computer.');
// end hard sentences 5
// hard sentences 6
const S34Q1 = new WritingTranslationQuestion('I do not hate you', '???ia cor kong gh?? t??y');
const S34Q2 = new MCVocabularyQuestion('I do not hate you', ['???ia cor kong gh?? t??y', '???ia cor kong gh?? ???ia', '???ia cor kong gh?? l??', '???ia cor kong gh?? her'], 1);
const S34Q3 = new AssemblingTranslationQuestion('I do not hate you', ['???ia', 'cor', 'kong', 'gh??', 't??y', '???ia', 'gh??', 'l??', 'her'], '???ia cor kong gh?? t??y.');
const S34Q4 = new WritingTranslationQuestion('I do not hate you.', '???ia cor kong gh?? t??y.');
const S34Q5 = new MCVocabularyQuestion('I do not hate you.', ['???ia cor kong gh?? t??y', '???ia cor kong gh?? ???ia', '???ia cor kong gh?? l??', '???ia cor kong gh?? her'], 1);
const S34Q6 = new AssemblingTranslationQuestion('I do not hate you.', ['???ia', 'cor', 'kong', 'gh??', 't??y', '???ia', 'gh??', 'l??', 'her'], '???ia cor kong gh?? t??y.');
// end hard sentences 6
// long sentences
const S35Q1 = new MCVocabularyQuestion("Ca yo ph??", ['The queen', 'The king', 'That king', 'That queen'], 1, true);
const S35Q2 = new MCVocabularyQuestion('I do not have a computer, but I have a phone.', ['???ia cor kong y?? con computer, mala ???ia y?? con f??n', '???ia cor kong y?? con c??mputa, mala ???ia y?? con f??n', '???ia cor kong y?? con computa, mala ???ia y?? con f??n', '???ia cor kong y?? con c??mputar, mala ???ia y?? con f??n'], 1);
const S35Q3 = new AssemblingTranslationQuestion('I do not have a computer, but I have a phone.', ['???ia', 'cor', 'kong', 'y??', 'con', 'computer', 'mala', '???ia', 'y??', 'con', 'f??n', '???ia', 'gh??', 'l??', 'her', 'fono', 'corzo', 'corzobe', 'un'], '???ia cor kong y?? con computer mala ???ia y?? con f??n.');
const S35Q4 = new MCVocabularyQuestion('You do not want a computer, and you do not want a phone.', ['Y cor kong mu?? con c??mputa, mala cor kong gh?? con f??n', 'Cor kong mu?? con computa, mala cor kong mu?? con f??n', 'T??y cor kong mu?? con computer, y t??y cor kong mu?? con f??n', 'Cor kong gh?? con c??mputar, mala cor kong mu?? con f??n'], 3);
const S35Q5 = new AssemblingTranslationQuestion('You do not want a computer, and you do not want a phone.', ['cor', 'kong', 'mu??', 'con', 'computer', 'mala', 'cor', 'kong', 'mu??', 'con', 'f??n', '???ia', 'gh??', 't??y', 'her', 'fono', 'corzo', 'corzobe', 'un', 'T??y', 'y', 'yo'], 'T??y cor kong mu?? con computer y t??y cor kong mu?? con f??n.');
const S35Q6 = new WritingTranslationQuestion('Are you me, are you you, are you.', 'Qi t??y ???ia, qi t??y t??y, qi t??y.');
// end long sentences
// long sentences 2
const S36Q1 = new AssemblingTranslationQuestion("I do not have a mother and a father, but I do want a mother and a father.", ['???ia', 'cor', 'kong', 'y??', 'con', 'm??', 'y', 'con', 'p??', 'mala', '???ia', 'cor', 'mu??', 'con', 'm??', 'y', 'con', 'p??', '???ia', 'gh??', 'l??', 'her', 'fono', 'corzo', 'corzobe', 'un', 'p??', '???ia', 'ch??'], '???ia cor kong y?? con m?? y con p?? mala ???ia cor mu?? con m?? y con p??.');
const S36Q2 = new MCVocabularyQuestion('You do not want one child but your man does want three children.', ['T??y cor kong mu?? unas ch?? mala nu?? par t??y does mu?? tr?? ch??a', 'T??y cor kong mu?? unas ch?? mala t??y nu?? does mu?? tr?? ch??a', '???ia cor kong mu?? unas ch?? mala t??y nu?? does mu?? tr?? ch??a', '???ia cor kong mu?? unas ch?? mala nu?? par t??y does mu?? tr?? ch??a'], 1)
const S36Q3 = new MCVocabularyQuestion('Are you a man or a woman?', ['Qi t??y con nu?? or con nu?? ph???', 'Qi tay con nuo or con nuo phu', 'Qi t??y con nu?? or con nu???', 'Qi ???ia con nu?? or con nu?? ph???'], 1);
const S36Q4 = new AssemblingTranslationQuestion('You are not my mother, you are not my father, and you are not my child, but you are an adult.', ['T??y', 'qi', 'kong', 'm??', 'par', '???i', 't??y', 'qi', 'kong', 'p??', 'par', '???i', 'y', 't??y', 'qi', 'kong', 'ch??', 'par', '???i', 'mala', 't??y', 'qi', 'con', 'od', 'ch??', 'n??', 'm??', 'gr??', 'par', '???ia', '???ia'], 'T??y qi kong m?? par ???i t??y qi kong p?? par ???i y t??y qi kong ch?? par ???i mala t??y qi con od ch??.')
const S36Q5 = new WritingTranslationQuestion('Are you me, are you you, are you.', 'Qi t??y ???ia, qi t??y t??y, qi t??y.');
const S36Q6 = new AudioHearQuestion("T??y qi kong con od ch??.", 'You are not an adult.');
// end long sentences 2
// birthday
const S37Q1 = new MCVocabularyQuestion('F??lis od bi', ['Happy birthday', 'Merry christmas', 'Happy halloween', 'Merry birthday'], 1, true);
const S37Q2 = new AudioHearQuestion('F??lis od bi.', 'Happy birthday.');
const S37Q3 = new AssemblingTranslationQuestion('You are now an adult.', ['T??y', 'qi', 'usho', 'con', 'od', 'ch??', '???ia'], 'T??y qi usho con od ch??.');
const S37Q4 = new AudioHearQuestion('T??y mu?? con ch??.', 'You want a child.');
const S37Q5 = new AudioHearQuestion('T??y qi usho con od ch??.', 'You are now an adult.');
const S37Q6 = new AudioHearQuestion('T??y qi kong con od ch??.', 'You are not an adult.');
// end birthday
// time
const S38Q1 = new MCVocabularyQuestion('What time is it?', ['What t??y es eso?', 'What t??y es es', 'What t??y eso es?', 'What t??i es eso'], 1);
const S38Q2 = new AudioHearQuestion('What t??y es eso?', 'What time is it?');
const S38Q3 = new AssemblingTranslationQuestion('Ten minutes remaining.', ['D??', 't??ia', 'xao', 'q??', 't??i', 'es', 'eso', '???ia'], 'D?? t??ia xao q??.');
const S38Q4 = new AudioHearQuestion('D?? t??ia xao q??.', 'Ten minutes remaining.');
const S38Q5 = new MCVocabularyQuestion('Are you at the house?', ['Qi t??y ?? bi?', 'Qi t??y ?? casa', 'Qi t??y ?? bi p??l?', 'Qi t??y en bi p??l'], 3);
const S38Q6 = new AudioHearQuestion('D?? t??ia xao q??.', 'Ten minutes remaining.');
// end time
// difficult sentences
// - Are you at the house
const S39Q1 = new AudioHearQuestion("Qi t??y ?? bi p??l", "Are you at the house");
const S39Q2 = new AudioHearQuestion("T??y qi kong con od ch??", "You are not an adult");
const S39Q3 = new AudioHearQuestion("T??y qi usho con od ch??", "You are now an adult");
const S39Q4 = new AudioHearQuestion("T??y mu?? con ch??", "You want a child");
const S39Q5 = new AudioHearQuestion("T??y cor kong mu?? con ch??", "You do not want a child");
const S39Q6 = new AudioHearQuestion("T??y cor kong mu?? unas ch?? mala nu?? par t??y does mu?? tr?? ch??a", "You do not want one child but your man does want three children");
// end difficult sentences
// useful sentences
// - Are you an adult
const S40Q1 = new AssemblingTranslationQuestion('Are you an adult?', ['Qi', 't??y', 'con', 'od', 'ch??', '???ia', 'T??y', 'qi', 'yo'], 'Qi t??y con od ch??.');
// - Do you not want a child
const S40Q2 = new AudioHearQuestion('Cor t??y kong mu?? con ch???', 'Do you not want a child?');
// - Do you hate me?
const S40Q3 = new AssemblingTranslationQuestion('Do you hate me?', ['Cor', 't??y', 'gh??', 'm??', '???ia', 'T??y', 'qi', 'yo', '???ia'], 'Cor t??y gh?? ???ia.');
// - Do you want a child?
const S40Q4 = new AudioHearQuestion('Cor t??y mu?? con ch???', 'Do you want a child?');
// - Is the king the queen?
const S40Q5 = new AssemblingTranslationQuestion('Is the king the queen?', ['Es', 'ca', 'yo', 'ca', 'yo ph??', '???ia', 'T??y', 'qi', 'yo', '???ia', 'ph??', 'cor'], 'Es ca yo ca yo ph??.');
// - Are you not at the house?
const S40Q6 = new AudioHearQuestion('Qi t??y kong ?? bi p??l', 'Are you not at the house?');
// end useful sentences
// useful sentences 2
// - Are you not an adult?
const S41Q1 = new AssemblingTranslationQuestion('Are you not an adult?', ['Qi', 't??y', 'kong', 'con', 'od', 'ch??', '???ia', 'T??y', 'qi', 'yo'], 'Qi t??y kong con od ch??.');
// - Do you want one child?
const S41Q2 = new AudioHearQuestion('Cor t??y mu?? unas ch???', 'Do you want one child?');
// - Do you want three children?
const S41Q3 = new AudioHearQuestion('Cor t??y mu?? tr?? ch??a?', 'Do you want three children?');
// - Are you a child?
const S41Q4 = new AssemblingTranslationQuestion('Are you a child?', ['Qi', 't??y', 'con', '???ia', 'T??y', 'qi', 'yo', 'ch??', 'ch??', 'ch??'], 'Qi t??y con ch??.');
// - Do you want an adult?
const S41Q5 = new AudioHearQuestion('Cor t??y mu?? con od ch???', 'Do you want an adult?');
// - Are you an adult?
const S41Q6 = new AudioHearQuestion('Qi t??y con od ch???', 'Are you an adult?');
// end useful sentences 2
// food 4
// - The egg
const S42Q1 = new MCVocabularyQuestion('The egg', ['Ca eg', 'Ca t??g', 'Ca ??g', 'Ca egg'], 2);
// - The banana
const S42Q2 = new MCVocabularyQuestion('The banana', ['Ca tung', 'Ca tong', 'Ca chung', 'Ca ching'], 1);
const S42Q3 = new PairsQuestion(['Egg', 'Apple', 'Banana', 'Pear'], ['T??g', '??pol', 'Tung', 'P??r'],
    new Map([['Egg', 'T??g'], ['Apple', '??pol'], ['Banana', 'Tung'], ['Pear', 'P??r']]));
// - The pear
const S42Q4 = new MCVocabularyQuestion('The pear', ['Ca p??r', 'Ca p??', 'Ca p??ra', 'Ca p??e'], 1);
// - The apple
const S42Q5 = new MCVocabularyQuestion('The apple', ['Ca ??pol', 'Ca ??pole', 'Ca tuo', 'Ca noug'], 1);
// - Robber
const S42Q6 = new MCVocabularyQuestion('Robber', ['R??', 'R?? le', 'R?? nuo', 'R?? nu??'], 4);
// end food 4
// friends
// - The friend
const S43Q1 = new MCVocabularyQuestion('The friend', ['Ca b??ng', 'Ca b??nga', 'Ca b??ng nuo', 'Ca b??ng nu??'], 1);
// - My friend
const S43Q2 = new AssemblingTranslationQuestion('My friend', ['T??y', 'b??ng', '???i', 'T??y', 'qi', 'yo', 'par', 'B??ng'], 'B??ng par ???i.');
// - The friendly man
const S43Q3 = new MCVocabularyQuestion('The friendly man', ['Ca b??ng nu??', 'Ca b??nge nu??', 'Ca b??nge nu?? ph??', 'Ca b??nga'], 2);
// - The friendly woman
const S43Q4 = new MCVocabularyQuestion('The friendly woman', ['Ca b??ng nu?? ph??', 'Ca b??nge nu??', 'Ca b??nge nu?? ph??', 'Ca b??nge ph??'], 3);
// - The friendly child
const S43Q5 = new MCVocabularyQuestion('The friendly child', ['Ca b??ng nu?? ch??', 'Ca b??nge nu?? ch??', 'Ca b??nge nu?? ch?? ph??', 'Ca b??nge ch??'], 4);
// - You are friendly
const S43Q6 = new AssemblingTranslationQuestion('You are friendly', ['Cor', 't??y', 'b??ng', '???i', '???ia', 'T??y', 'qi', 'yo', 'par', 'B??nge', 'b??nge'], 'T??y qi b??nge.');
// end friends
// food 5
// - The apple
const S44Q1 = new MCVocabularyQuestion('The apple', ['Ca ??pol', 'Ca ??pole', 'Ca tuo', 'Ca noug'], 1);
// - The pear
const S44Q2 = new MCVocabularyQuestion('The pear', ['Ca p??r', 'Ca p??', 'Ca p??ra', 'Ca p??e'], 1);
// - The banana
const S44Q3 = new MCVocabularyQuestion('The banana', ['Ca tung', 'Ca tong', 'Ca chung', 'Ca ching'], 1);
// - The child eats the food
const S44Q4 = new AssemblingTranslationQuestion('The child eats the food', ['Ca', 'ch??', 't??y', 'kong', 'ca', '???i', '???ia', 'T??y', 'qi', 'yo', 'par', 'ana', 'b??nge', 'f??d'], 'Ca ch?? ana ca f??d.');
// - The toilet
const S44Q5 = new MCVocabularyQuestion('The toilet', ['Ca ley z??t', 'Ca lea z??t', 'Ca ley zut', 'Ca t??l ca'], 1);
// - The bathroom
const S44Q6 = new MCVocabularyQuestion('The bathroom', ['Ca ley', 'Ca lerry', 'Ca ley nu??', 'Ca ley ph??'], 1);
// end food 5
// vehicles
// - The car
const S45Q1 = new MCVocabularyQuestion('The car', ['Ca k??', 'Ca k??l', 'Ca xao k??', 'Ca k?? ph??'], 1);
// - The bike
const S45Q2 = new MCVocabularyQuestion('The bike', ['Ca xao py', 'Ca py', 'Ca pyh', 'Ca piel'], 1);
// - I ride the bike
const S45Q3 = new AssemblingTranslationQuestion('I ride the bike', ['T??y', 'kong', 'ca', '???i', '???ia', 'T??y', 'qi', 'yo', 'par', 'py', 'xao', 'pyh', 'f??y'], '???ia f??y ca xao py.');
// - The bus
const S45Q4 = new MCVocabularyQuestion('The bus', ['Ca b??s', 'Ca b??h', 'Ca b??h ph??', 'Ca b??s ph??'], 1);
// - The helicopter
const S45Q5 = new MCVocabularyQuestion('The helicopter', ['Ca w??in', 'Ca xao w??in', 'Ca w??in pho', 'Ca pho w??in'], 4);
// - I like to drive a car
const S45Q6 = new AssemblingTranslationQuestion('I like to drive a car', ['T??y', 'con', 'ca', 'se', '???ia', 'T??y', 'qi', 'yo', 'par', 'k??', 'xao', 'k??', 'tigh', 'f??y'], '???ia tigh se f??y con k??.');
// end vehicles


const SIMPLE_WORDS = new LessonInformation('Simple Words', [SQ1, SQ2, SQ3, SQ4, SQ5, SQ6]);
const SIMPLE_WORDS_2 = new LessonInformation('Simple Words 2', [S2Q1, S2Q2, S2Q3, S2Q4, S2Q5, S2Q6]);
const FAMILY = new LessonInformation('Family', [S3Q1, S3Q2, S3Q3, S3Q4, S3Q5, S3Q6]);
const FAMILY_2 = new LessonInformation('Family 2', [S4Q1, S4Q2, S4Q3, S4Q4, S4Q5, S4Q6]);
const FOOD = new LessonInformation('Food', [S5Q1, S5Q2, S5Q3, S5Q4, S5Q5, S5Q6]);
const FOOD_2 = new LessonInformation('Food 2', [S6Q1, S6Q2, S6Q3, S6Q4, S6Q5, S6Q6]);
const SIMPLE_SENTENCES = new LessonInformation('Simple Sentences', [S7Q1, S7Q2, S7Q3, S7Q4, S7Q5, S7Q6]);
const GENERAL_SENTENCES = new LessonInformation('General Sentences', [S8Q1, S8Q2, S8Q3, S8Q4, S8Q5, S8Q6]);
const GENERAL_SENTENCES_2 = new LessonInformation('General Sentences 2', [S9Q1, S9Q2, S9Q3, S9Q4, S9Q5, S9Q6]);
const SIMPLE_WORDS_3 = new LessonInformation('Simple Words 3', [S10Q1, S10Q2, S10Q3, S10Q4, S10Q5, S10Q6]);
const GENERAL_SENTENCES_3 = new LessonInformation('General Sentences 3', [S11Q1, S11Q2, S11Q3, S11Q4, S11Q5, S11Q6]);
const GENERAL_SENTENCES_4 = new LessonInformation('General Sentences 4', [S12Q1, S12Q2, S12Q3, S12Q4, S12Q5, S12Q6]);
const HARD_SENTENCES = new LessonInformation('Hard Sentences', [S13Q1, S13Q2, S13Q3, S13Q4, S13Q5, S13Q6, S13Q7, S13Q8]);
const HARD_SENTENCES_2 = new LessonInformation('Hard Sentences 2', [S14Q1, S14Q2, S14Q3, S14Q4, S14Q5, S14Q6]);
const DAILY_LIFE = new LessonInformation('Daily Life', [S15Q1, S15Q2, S15Q3, S15Q4, S15Q5, S15Q6]);
const GENERAL_ANSWERS = new LessonInformation('General Answers', [S16Q1, S16Q2, S16Q3, S16Q4, S16Q5, S16Q6]);
const GENERAL_ANSWERS_2 = new LessonInformation('General Answers 2', [S17Q1, S17Q2, S17Q3, S17Q4, S17Q5, S17Q6]);
const GREETINGS = new LessonInformation('Greetings', [S18Q1, S18Q2, S18Q3, S18Q4, S18Q5, S18Q6]);
const GREETINGS_2 = new LessonInformation('Greetings 2', [S19Q1, S19Q2, S19Q3, S19Q4, S19Q5, S19Q6]);
const LANGUAGES = new LessonInformation('Languages', [S20Q1, S20Q2, S20Q3, S20Q4, S20Q5, S20Q6]);
const LANGUAGES_2 = new LessonInformation('Languages 2', [S21Q1, S21Q2, S21Q3, S21Q4, S21Q5, S21Q6]);
const NUMBERS_1 = new LessonInformation('Numbers 1', [S22Q1, S22Q2, S22Q3, S22Q4, S22Q5, S22Q6]);
const NUMBERS_2 = new LessonInformation('Numbers 2', [S23Q1, S23Q2, S23Q3, S23Q4, S23Q5, S23Q6]);
const NUMBERS_3 = new LessonInformation('Numbers 3', [S24Q1, S24Q2, S24Q3, S24Q4, S24Q5, S24Q6]);
const PEOPLE = new LessonInformation('People', [S25Q1, S25Q2, S25Q3, S25Q4, S25Q5, S25Q6]);
const CLOTHES = new LessonInformation('Clothes', [S26Q1, S26Q2, S26Q3, S26Q4, S26Q5, S26Q6]);
const ANIMALS = new LessonInformation('Animals', [S27Q1, S27Q2, S27Q3, S27Q4, S27Q5, S27Q6]);
const COLORS = new LessonInformation('Colors', [S28Q1, S28Q2, S28Q3, S28Q4, S28Q5, S28Q6]);
const FOOD_3 = new LessonInformation('Food 3', [S29Q1, S29Q2, S29Q3, S29Q4, S29Q5, S29Q6]);
const HARD_SENTENCES_3 = new LessonInformation('Hard Sentences 3', [S30Q1, S30Q2, S30Q3, S30Q4, S30Q5, S30Q6]);
const HARD_SENTENCES_4 = new LessonInformation('Hard Sentences 4', [S31Q1, S31Q2, S31Q3, S31Q4, S31Q5, S31Q6]);
const COMPUTERS = new LessonInformation('Computers', [S32Q1, S32Q2, S32Q3, S32Q4, S32Q5, S32Q6]);
const HARD_SENTENCES_5 = new LessonInformation('Hard Sentences 5', [S33Q1, S33Q2, S33Q3, S33Q4, S33Q5, S33Q6]);
const HARD_SENTENCES_6 = new LessonInformation('Hard Sentences 6', [S34Q1, S34Q2, S34Q3, S34Q4, S34Q5, S34Q6]);
const LONG_SENTENCES = new LessonInformation('Long Sentences', [S35Q1, S35Q2, S35Q3, S35Q4, S35Q5, S35Q6]);
const LONG_SENTENCES_2 = new LessonInformation('Long Sentences 2', [S36Q1, S36Q2, S36Q3, S36Q4, S36Q5, S36Q6]);
const BIRTHDAY = new LessonInformation('Birthday', [S37Q1, S37Q2, S37Q3, S37Q4, S37Q5, S37Q6]);
const TIME = new LessonInformation('Time', [S38Q1, S38Q2, S38Q3, S38Q4, S38Q5, S38Q6]);
const DIFFICULT_SENTENCES = new LessonInformation('Difficult Sentences', [S39Q1, S39Q2, S39Q3, S39Q4, S39Q5, S39Q6]);
const USEFUL_SENTENCES = new LessonInformation('Useful Sentences', [S40Q1, S40Q2, S40Q3, S40Q4, S40Q5, S40Q6]);
const USEFUL_SENTENCES_2 = new LessonInformation('Useful Sentences 2', [S41Q1, S41Q2, S41Q3, S41Q4, S41Q5, S41Q6]);
const FOOD_4 = new LessonInformation('Food 4', [S42Q1, S42Q2, S42Q3, S42Q4, S42Q5, S42Q6]);
const FRIENDS = new LessonInformation('Friends', [S43Q1, S43Q2, S43Q3, S43Q4, S43Q5, S43Q6]);
const FOOD_5 = new LessonInformation('Food 5', [S44Q1, S44Q2, S44Q3, S44Q4, S44Q5, S44Q6]);
const VEHICLES = new LessonInformation('Vehicles', [S45Q1, S45Q2, S45Q3, S45Q4, S45Q5, S45Q6]);

var CURRENT_LESSON = new LessonInformation('NULL', []);
const lessons = [SIMPLE_WORDS, SIMPLE_WORDS_2, FAMILY, FAMILY_2, FOOD, FOOD_2, SIMPLE_SENTENCES, GENERAL_SENTENCES,
    GENERAL_SENTENCES_2, SIMPLE_WORDS_3, GENERAL_SENTENCES_3, GENERAL_SENTENCES_4, HARD_SENTENCES,
    HARD_SENTENCES_2, DAILY_LIFE, GENERAL_ANSWERS, GENERAL_ANSWERS_2, GREETINGS, GREETINGS_2, LANGUAGES,
    LANGUAGES_2, NUMBERS_1, NUMBERS_2, NUMBERS_3, PEOPLE, CLOTHES, ANIMALS, COLORS, FOOD_3, HARD_SENTENCES_3,
    HARD_SENTENCES_4, COMPUTERS, HARD_SENTENCES_5, HARD_SENTENCES_6, LONG_SENTENCES, LONG_SENTENCES_2,
    BIRTHDAY, TIME, DIFFICULT_SENTENCES, USEFUL_SENTENCES, USEFUL_SENTENCES_2, FOOD_4, FRIENDS,
    FOOD_5, VEHICLES]; 
ReactDOM.render(
    <AppDisplay />,
    document.getElementById('root')
);


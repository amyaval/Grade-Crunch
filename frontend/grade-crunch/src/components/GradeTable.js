import { useState } from 'react';

function GradeTable() {
    //initializng state for Grade Table component
    const initialRows = [
        { assignment: "Homework 1", grade: 89, weight: 5},
        { assignment: "Quiz 2", grade: 70, weight: 2},
        { assignment: '', grade: null, weight: 0},
        { assignment: '', grade: null, weight: 0},
        { assignment: '', grade: null, weight: 0},
        { assignment: '', grade: null, weight: 0},
    ];

    //states for the dynamic components of the grade table, which are rows, calculated grade, grade types, and weight types
      const [rows, setRows ] = useState(initialRows); 
      const [calculatedGrade, setCalculatedGrade] = useState(null);
      const [gradeType, setGradeType] = useState('Percent'); //default grade type is percent
      const [weightType, setWeightType] = useState('Percent'); //default weight type is percent
      const [classTitle, setClassTitle] = useState(""); //default class title is empty string

    //function to add a new row (ES6 syntax)
    const addRow = () => {
        const newRow = {
            assignment: '',
            grade: null,
            weight: 0
        };
        setRows([...rows, newRow]);
    };

    //function to reset a row (ES6 syntax)
    const resetTable = () => {
        setRows([...initialRows]);
        setCalculatedGrade(null);
    };

    //function to handle input changes (ES6 syntax)
    const handleInputChange = (index, field, value) => { //index, field, and input value of row
        setRows(rows.map((row, i) =>
            i === index ? {...row, [field]: value } : row
        ));
    };

    //function to handle class name changes (ES6 syntax)
    const handleClassTitleChange = (e) => {
        setClassTitle(e.target.value);
    };

    //function to convert letter grade to percentage
    const letterToPercent = (letter) => {
        const gradeMap = {
            'A+': 97, 'A': 93, 'A-': 90,
            'B+': 87, 'B': 83, 'B-': 80,
            'C+': 77, 'C': 73, 'C-': 70,
            'D+': 67, 'D': 65, 'D-': 60,
            'F': 50
        };

        return gradeMap[letter.toUpperCase()] || 0;
    };

    //function to calculate weighted grade
    const calculateGrade = () => {
        //filter out rows that have valid grades and weights
        const validRows = rows.filter(row =>
            row.grade !== null && row.grade !== '' && row.weight > 0 && row.assignment.trim() !== ''
        );

        if(validRows.length === 0){
            alert('Please enter at least one assignment with a grade and a weight.');
            return;
        }

        //calculate weighted grade
        let totalWeightedPoints = 0;
        let totalWeight = 0;

        validRows.forEach(row => {
            let gradeValue;
            const weight = parseFloat(row.weight);

            if(gradeType === 'Letter'){
                gradeValue = letterToPercent(row.grade);
            }
            else if(gradeType === 'Points'){
                //For points we need to know the max points to convert to percentage
                //for now, assuming input is within 0-100 percentage range
                let earnedPoints = parseFloat(row.grade);
                let totalPoints = parseFloat(row.weight);

                gradeValue = (earnedPoints / totalPoints) * 100;
            }
            else{
                gradeValue = parseFloat(row.grade);
            }

            if(!isNaN(gradeValue) && !isNaN(weight)) {
                totalWeightedPoints += (gradeValue * weight);
                totalWeight += weight;
            }
        });

        if(totalWeight === 0){
            alert('Total weight cannot be zero.');
            return;
        }

        const weightedAverage = totalWeightedPoints / totalWeight;
        setCalculatedGrade(weightedAverage);
    };

    //function to convert grade to letter
    const getLetterGrade = (grade) => {
        if(grade >= 97) return 'A+';
        if(grade >= 93) return 'A';
        if(grade >= 90) return 'A-';
        if(grade >= 87) return 'B+';
        if(grade >= 83) return 'B';
        if(grade >= 80) return 'B-';
        if(grade >= 77) return 'C+';
        if(grade >= 73) return 'C';
        if(grade >= 70) return 'C-';
        if(grade >= 67) return 'D+';
        if(grade >= 65) return 'D';
        if(grade >= 60) return 'D-';
        return 'F';
    };

    

    return(
        <div className="bg-center p-8 w-screen"
             style={{ 
                backgroundImage: "url('./images/background2.png')" 
             }}
        >
            <div className="py-5">
                <div className="text-wrap mx-80 pb-5 bg-white/70 px-4 rounded-2xl py-3">
                   <h1 className="flex justify-center text-3xl font-bold pb-2">
                        Grade Calculator
                    </h1>
                    <p className="text-wrap pb-3">
                        This grade calculator is designed to help students calculate their overall course grade by combining multiple assignments, exams, and projects with their respective weights.
                        Grades for assignments and/or other assesments can be represented via percentage, letters, or points. 
                    </p>
                    <div className="flex justify-center bg-blue-500 py-2 md:border-black border">
                        <p className="text-white">
                            Modify the values and click the Calculate button to display grade
                        </p>
                    </div>
                </div>
                <div className="md:border md:border-black border-2 rounded-lg shadow-lg overflow-hidden mx-80 py-4 bg-gray-50">
                    <label className="px-5 pb-2">
                        Class Name (optional):
                    </label>
                    <input 
                        type="text"
                        value={classTitle}
                        placeholder="Enter class name"
                        className="bg-white border border-gray-300 rounded-md px-3 py-2 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        onChange={handleClassTitleChange}
                    />
                    <p className="py-3 flex justify-center">
                        Select grade type:
                    </p>
                    <div className="bg-gray-200 text-gray-700 font-medium rounded transition-all mx-64 mb-3 mt-1">
                        <button 
                            onClick={() => {
                                setGradeType('Percent');
                                setWeightType('Percent');
                            }}
                            className={`hover:bg-gray-300 py-2 px-4 ${gradeType === 'Percent' ? 'bg-gray-400 text-white' : ''}`}
                        >
                            Percent
                        </button>
                        <button 
                            onClick={() => {
                                setGradeType('Points');
                                setWeightType('Points');
                            }}
                            className={`hover:bg-gray-300 py-2 px-4 ${gradeType === 'Points' ? 'bg-gray-400 text-white' : ''}`}
                        >
                            Points
                        </button>
                        <button 
                            onClick={() => {
                                setGradeType('Letter');
                                setWeightType('Percent');
                            }}
                            className={`hover:bg-gray-300 py-2 px-4 ${gradeType === 'Letter' ? 'bg-gray-400 text-white' : ''}`}
                        >
                            Letter
                        </button>
                    </div>
                    <table className="mx-auto bg-gray-50">
                        <thead className="TableHead">
                            <tr className="TableRow">
                                <th className="Assignment">Assignment/Exam</th>
                                <th className="Grade">
                                    Grade {gradeType === 'Percent' ? '(%)' : gradeType === 'Letter' ? '(Letter)' : '(Points)'}
                                </th>
                                <th className="Weight">
                                    Weight {weightType === 'Percent' ? '(%)' : '(Total points)'}
                                </th>
                            </tr> 
                        </thead>
                        <tbody className="TableBody">
                            {rows.map((row, index) => (
                                <tr key={index} className="GradeTableRow">
                                    <td className="AssignmentField">
                                        <input
                                            type="text"
                                            value={row.assignment}
                                            onChange={(e) => handleInputChange(index, 'assignment', e.target.value)}
                                            className="bg-white border-gray-300 rounded-md px-3 py-2 shadow-lg hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            placeholder="Enter assignment"
                                        />
                                    </td>
                                    <td className="GradeField">
                                        {gradeType === 'Letter' ? (
                                            <select
                                                value={row.grade || ''}
                                                onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
                                                className="bg-white border-gray-300 rounded-md px-3 py-2 shadow-lg hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            >
                                                <option value="">Select grade</option>
                                                <option value="A+">A+</option>
                                                <option value="A">A</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B">B</option>
                                                <option value="B-">B-</option>
                                                <option value="C+">C+</option>
                                                <option value="C">C</option>
                                                <option value="C-">C-</option>
                                                <option value="D+">D+</option>
                                                <option value="D">D</option>
                                                <option value="D-">D-</option>
                                                <option value="F">F</option>
                                            </select>
                                        ) : (
                                            <input  
                                                type="number"
                                                value={row.grade || ""}
                                                onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
                                                className="bg-white border-gray-300 rounded-md px-3 py-2 shadow-lg hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                placeholder={gradeType === 'Points' ? 'Enter points' : 'Enter grade'}
                                            />
                                        )}     
                                    </td>
                                    <td className="WeightField">
                                        <input
                                            type="number"
                                            value={row.weight || ''}
                                            onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                                            className="bg-white border-gray-300 rounded-md px-3 py-2 shadow-lg hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                            placeholder={weightType === 'Points' ? 'Enter total points' : 'Enter weight'}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="py-4 flex justify-center">
                        <button
                            onClick={addRow}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded shadow-md hover:shadow-lg transition-all mr-1"
                        >
                            Add Row
                        </button>
                        <button
                            onClick={resetTable}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded shadow-md hover:shadow-lg transition-all ml-1"
                        >
                            Reset
                        </button>
                    </div>
                    <div className="py-3 flex justify-center">
                        <button
                            onClick={calculateGrade}
                            className="bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded shadow-md hover:shadow-lg transition-all"
                        >
                            Calculate
                        </button>
                    </div>

                    {calculatedGrade !== null && (
                        <div className="py-4 flex justify-center">
                            <div className="bg-blue-50 border-blue-200 rounded-lg p-4 shadow-md">
                                <p className="text-lg font-semibold text-blue-800">
                                    Calculated Grade:
                                    <span className="ml-2 text-blue-600">
                                        {calculatedGrade.toFixed(2)}% ({getLetterGrade(calculatedGrade)})
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mx-72 text-wrap text-center bg-white/70">
                <p className="pt-6">
                    The calculators above use the following letter grades and their typical corresponding numerical equivalents based on grade points.
                </p>
            </div>
            
            <div className="py-7">
                <table className="md:border md:border-black mx-auto border-2 table-auto">
                    <thead>
                        <tr className="bg-blue-500">
                            <th className="px-2">Letter Grade</th>
                            <th className="px-2">Percentage</th>
                            <th className="px-2">GPA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="px-2">A+</td>
                            <td className="px-2">97-100%</td>
                            <td className="px-2">4.0</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="px-2">A</td>
                            <td className="px-2">93-96%</td>
                            <td className="px-2">4.0</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-2">A-</td>
                            <td className="px-2">90-92%</td>
                            <td className="px-2">3.7</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="px-2">B+</td>
                            <td className="px-2">87-89%</td>
                            <td className="px-2">3.3</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-2">B</td>
                            <td className="px-2">83-86%</td>
                            <td className="px-2">3.0</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="px-2">B-</td>
                            <td className="px-2">80-82%</td>
                            <td className="px-2">2.7</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-2">C+</td>
                            <td className="px-2">77-79%</td>
                            <td className="px-2">2.3</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="px-2">C</td>
                            <td className="px-2">73-76%</td>
                            <td className="px-2">2.0</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-2">C-</td>
                            <td className="px-2">70-72%</td>
                            <td className="px-2">1.7</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="px-2">D+</td>
                            <td className="px-2">67-69%</td>
                            <td className="px-2">1.3</td>
                        </tr>
                        <tr className="bg-white">
                            <td className="px-2">D</td>
                            <td className="px-2">65-66%</td>
                            <td className="px-2">1.0</td>
                        </tr>
                        <tr className="bg-gray-200">
                            <td className="px-2">D-/F</td>
                            <td className="px-2">Below 65%</td>
                            <td className="px-2">0.0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GradeTable;
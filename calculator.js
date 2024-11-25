// calculator.js
import { courses, workingDays, timeSlots, venues, maxCreditsPerWeek } from './data.js';

function initializeTimetableGenerator() {
    const courseDropdown = document.getElementById('course');
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.code;
        option.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
        courseDropdown.appendChild(option);
    });

    document.getElementById('confirmCourses').addEventListener('click', handleCourseSelection);
    document.getElementById('generateBtn').addEventListener('click', handleGenerate);
}

function handleCourseSelection() {
    const courseDropdown = document.getElementById('course');
    const errorDiv = document.getElementById('error');
    const selectedOptions = Array.from(courseDropdown.selectedOptions);
    
    if (selectedOptions.length < 5) {
        errorDiv.textContent = 'Please select at least 5 courses!';
        return;
    }

    const selectedCourses = selectedOptions.map(option => {
        const courseCode = option.value;
        return courses.find(course => course.code === courseCode);
    });

    displayFacultySelection(selectedCourses);
}

function displayFacultySelection(selectedCourses) {
    const facultySelectionsDiv = document.getElementById('facultySelections');
    facultySelectionsDiv.innerHTML = '<h3>Select Faculty for Each Course:</h3>';
    
    selectedCourses.forEach(course => {
        const facultySelection = document.createElement('div');
        facultySelection.className = 'faculty-selection';
        
        const select = document.createElement('select');
        select.id = `faculty-${course.code}`;
        select.name = `faculty-${course.code}`;
        
        const label = document.createElement('label');
        label.textContent = `${course.code} - ${course.name}: `;
        label.htmlFor = select.id;
        
        course.faculty.forEach(faculty => {
            const option = document.createElement('option');
            option.value = faculty;
            option.textContent = faculty;
            select.appendChild(option);
        });
        
        facultySelection.appendChild(label);
        facultySelection.appendChild(select);
        facultySelectionsDiv.appendChild(facultySelection);
    });
    
    facultySelectionsDiv.style.display = 'block';
    document.getElementById('generateBtn').style.display = 'block';
}

function validateFacultySelections(selectedCourses) {
    const facultyAssignments = {};
    const errors = [];

    selectedCourses.forEach(course => {
        if (facultyAssignments[course.assignedFaculty]) {
            errors.push(`${course.assignedFaculty} is already assigned to ${facultyAssignments[course.assignedFaculty]}. Cannot teach ${course.code} as well.`);
        } else {
            facultyAssignments[course.assignedFaculty] = course.code;
        }
    });

    return errors;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleGenerate() {
    const courseDropdown = document.getElementById('course');
    const errorDiv = document.getElementById('error');
    const selectedOptions = Array.from(courseDropdown.selectedOptions);
    
    const selectedCourses = selectedOptions.map(option => {
        const courseCode = option.value;
        const course = courses.find(c => c.code === courseCode);
        const selectedFaculty = document.getElementById(`faculty-${courseCode}`).value;
        return { ...course, assignedFaculty: selectedFaculty };
    });

    // Validate faculty assignments
    const facultyErrors = validateFacultySelections(selectedCourses);
    if (facultyErrors.length > 0) {
        errorDiv.textContent = facultyErrors.join('\n');
        return;
    }

    // Validate total credits
    const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);
    if (totalCredits > (maxCreditsPerWeek * workingDays.length)) {
        errorDiv.textContent = `Total credits (${totalCredits}) exceed maximum allowed (${maxCreditsPerWeek * workingDays.length})`;
        return;
    }

    errorDiv.textContent = '';
    generateTimeTable(selectedCourses);
}

function generateAvailableSlots() {
    const slots = [];
    workingDays.forEach((day, dayIndex) => {
        timeSlots.forEach((time, timeIndex) => {
            if (time !== 'Lunch Break') {
                slots.push({ day, timeIndex, dayIndex });
            }
        });
    });
    return shuffle(slots); // Randomize available slots
}

function generateTimeTable(selectedCourses) {
    const maxAttempts = 50; // Maximum attempts to generate a valid timetable
    let attempts = 0;

    while (attempts < maxAttempts) {
        attempts++;
        const result = attemptTimeTableGeneration(selectedCourses);
        if (result.success) {
            displayTimetable(result.timetable, selectedCourses);
            return;
        }
    }

    document.getElementById('error').textContent = 'Could not generate a valid timetable after multiple attempts. Please try different combinations.';
}

function attemptTimeTableGeneration(selectedCourses) {
    const timetable = {};
    const usedSlots = new Set();
    const facultySchedule = {};
    const dayLoad = {};

    // Initialize schedules
    workingDays.forEach(day => {
        dayLoad[day] = 0;
    });

    selectedCourses.forEach(course => {
        facultySchedule[course.assignedFaculty] = new Set();
    });

    // Randomize course order for each attempt
    const shuffledCourses = shuffle([...selectedCourses]);

    const availableSlots = generateAvailableSlots();

    for (const course of shuffledCourses) {
        const courseSlots = [];
        let assignedClasses = 0;
        const neededSlots = new Set();

        // Try to assign all classes for this course
        for (let i = 0; i < course.credits; i++) {
            let slotAssigned = false;

            // Try each available slot
            for (const slot of availableSlots) {
                const slotKey = `${slot.day}-${slot.timeIndex}`;
                
                // Skip if slot is already used or faculty is busy
                if (usedSlots.has(slotKey) || facultySchedule[course.assignedFaculty].has(slotKey)) {
                    continue;
                }

                // Check if we're not overloading any particular day
                if (dayLoad[slot.day] >= maxCreditsPerWeek) {
                    continue;
                }

                // Assign the slot
                const venue = venues[Math.floor(Math.random() * venues.length)];
                courseSlots.push({
                    day: slot.day,
                    timeIndex: slot.timeIndex,
                    venue
                });

                usedSlots.add(slotKey);
                facultySchedule[course.assignedFaculty].add(slotKey);
                dayLoad[slot.day]++;
                assignedClasses++;
                slotAssigned = true;
                break;
            }

            if (!slotAssigned) {
                return { success: false };
            }
        }

        timetable[course.code] = courseSlots;
    }

    return { success: true, timetable };
}

function displayTimetable(timetable, selectedCourses) {
    let outputHTML = '<h2>Generated Timetable</h2>';
    
    outputHTML += '<table><tr><th>Time / Day</th>';
    workingDays.forEach(day => {
        outputHTML += `<th>${day}</th>`;
    });
    outputHTML += '</tr>';

    timeSlots.forEach((time, timeIndex) => {
        outputHTML += `<tr>
            <td>${time}</td>`;
        
        if (time === 'Lunch Break') {
            workingDays.forEach(() => {
                outputHTML += '<td class="lunch-break">Lunch Break</td>';
            });
        } else {
            workingDays.forEach(day => {
                let cellContent = '';
                for (const courseCode in timetable) {
                    const courseSlots = timetable[courseCode];
                    const slot = courseSlots.find(s => s.day === day && s.timeIndex === timeIndex);
                    
                    if (slot) {
                        const course = selectedCourses.find(c => c.code === courseCode);
                        cellContent = `
                            <div class="course-cell">
                                <strong>${course.code}</strong><br>
                                ${course.name}<br>
                                ${course.assignedFaculty}<br>
                                ${slot.venue}
                            </div>
                        `;
                        break;
                    }
                }
                outputHTML += `<td>${cellContent || '-'}</td>`;
            });
        }
        
        outputHTML += '</tr>';
    });
    
    outputHTML += '</table>';
    document.getElementById('Output').innerHTML = outputHTML;
}

export { initializeTimetableGenerator };
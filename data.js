// data.js
const courses = [
    { 
        code: 'CS101', 
        name: 'Introduction to Programming', 
        credits: 3, 
        faculty: ['Dr. Smith', 'Prof. Anderson', 'Dr. Chen', 'Prof. Rodriguez']
    },
    { 
        code: 'CS102', 
        name: 'Data Structures', 
        credits: 4, 
        faculty: ['Dr. Johnson', 'Prof. Williams', 'Dr. Kumar', 'Prof. Davis']
    },
    { 
        code: 'CS103', 
        name: 'Algorithms', 
        credits: 3, 
        faculty: ['Dr. Wilson', 'Prof. Thompson', 'Dr. Garcia', 'Prof. Martinez']
    },
    { 
        code: 'CS104', 
        name: 'Discrete Mathematics', 
        credits: 3, 
        faculty: ['Dr. Brown', 'Prof. Taylor', 'Dr. Lee', 'Prof. Moore']
    },
    { 
        code: 'CS105', 
        name: 'Computer Networks', 
        credits: 3, 
        faculty: ['Dr. White', 'Prof. Jackson', 'Dr. Patel', 'Prof. Adams']
    },
    { 
        code: 'CS106', 
        name: 'Database Systems', 
        credits: 4, 
        faculty: ['Dr. Miller', 'Prof. Clark', 'Dr. Zhang', 'Prof. Scott']
    },
    { 
        code: 'CS107', 
        name: 'Operating Systems', 
        credits: 3, 
        faculty: ['Dr. Harris', 'Prof. Lewis', 'Dr. Nguyen', 'Prof. Hall']
    },
    { 
        code: 'CS108', 
        name: 'Software Engineering', 
        credits: 3, 
        faculty: ['Dr. Young', 'Prof. Walker', 'Dr. King', 'Prof. Wright']
    },
    { 
        code: 'CS109', 
        name: 'Artificial Intelligence', 
        credits: 4, 
        faculty: ['Dr. Lopez', 'Prof. Hill', 'Dr. Green', 'Prof. Baker']
    },
    { 
        code: 'CS110', 
        name: 'Machine Learning', 
        credits: 4, 
        faculty: ['Dr. Turner', 'Prof. Phillips', 'Dr. Campbell', 'Prof. Morgan']
    },
    { 
        code: 'CS201', 
        name: 'Cybersecurity Fundamentals', 
        credits: 3, 
        faculty: ['Dr. Evans', 'Prof. Collins', 'Dr. Stewart', 'Prof. Morris']
    },
    { 
        code: 'CS202', 
        name: 'Web Development', 
        credits: 3, 
        faculty: ['Dr. Murphy', 'Prof. Rogers', 'Dr. Reed', 'Prof. Cooper']
    },
    { 
        code: 'CS203', 
        name: 'Mobile App Development', 
        credits: 3, 
        faculty: ['Dr. Peterson', 'Prof. Richardson', 'Dr. Cox', 'Prof. Howard']
    },
    { 
        code: 'CS204', 
        name: 'Cloud Computing', 
        credits: 3, 
        faculty: ['Dr. Ward', 'Prof. Torres', 'Dr. Gray', 'Prof. Watson']
    },
    { 
        code: 'CS205', 
        name: 'Computer Graphics', 
        credits: 3, 
        faculty: ['Dr. Russell', 'Prof. Price', 'Dr. Bennett', 'Prof. Wood']
    }
];

const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const timeSlots = [
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    'Lunch Break',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
];

const venues = [
    'LT 101', 'LT 102', 'LT 103', 'LT 104', 'LT 201', 'LT 202', 'LT 203', 'LT 204', 'LT 205',
    'LT 301', 'LT 302', 'LT 303', 'LT 304', 'LT 305'
];

const maxCreditsPerWeek = 5;

export { courses, workingDays, timeSlots, venues, maxCreditsPerWeek };
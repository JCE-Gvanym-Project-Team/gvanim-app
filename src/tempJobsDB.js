const jobsDB = [
    {
        id: 145,
        description: "לצוות המקצועי של מכינת 'הד'- מכינה לחיים עצמאיים לצעירים שחוו משבר נפשי, דרוש/ה רכז/ת",
        jobScope: "50%",
        location: "שדרות",
        datePosted: new Date('2023-03-06')
    },
    {
        id: 193,
        description: "לתכנית דיור ייחודית לצעירים זכאי סל שיקום, דרוש/ה איש/ אשת מקצוע לתפקיד ניהולי",
        jobScope: "75% - 100%",
        location: "עפולה",
        datePosted: new Date('2023-03-06')
    },
    {
        id: 88,
        description: 'למכינת "כנפיים" בשדרות דרושים רכזים חברתיים',
        jobScope: "50%",
        location: "שדרות",
        datePosted: new Date('2023-03-06')
    },
    {
        id: 59,
        description: 'דרוש/ה עובד/ת מקצועי/ת למערך התעסוקה המוגנת ב"גוונים בקפה"',
        jobScope: "חלקי",
        location: "אשקלון",
        datePosted: new Date('2023-03-06')
    },
    {
        id: 226,
        description: 'לתכנית המכשירה ומלווה צעירים עם מגבלה בהגשמת חלומם התעסוקתי, דרוש/ה רכז/ת תעסוקה',
        jobScope: "75% - 100%",
        location: "ראשון לציון - רמת גן",
        datePosted: new Date('2023-03-06')
    },
    {
        id: 227,
        description: 'לתכנית המשלבת צעירים עם מגבלה בצה"ל דרוש/ה רכז/ת',
        jobScope: "100%",
        location: "מרחב השרון",
        datePosted: new Date('2023-03-05')
    },

    {
        id: 122,
        description: "לצוות של מכינת 'דרור' המלווה צעירים על הספקטרום האוטיסטי בתפקוד גבוה, דרוש/ה רכז/ ת",
        jobScope: "100%",
        location: "שדרות",
        datePosted: new Date('2023-02-28')
    },
    {
        id: 170,
        description: 'לתכנית "הד" - מסגרת ייחודית לצעירים, דרוש/ה עו"ס',
        jobScope: "חלקית (עם אפשרות להרחבת המשרה)",
        location: "עפולה",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 162,
        description: 'לתכנית "דיור נתמך בקהילה" דרוש רכז',
        jobScope: "50%\nשעות עבודה: בוקר ושלוש משמרות ערב בשבוע",
        location: "אזור שדרות / חוף אשקלון / אופקים / קרית גת והסביבה",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 222,
        description: "למערך התעסוקה המלווה אנשים עם מגבלה בהגשמת חלומם התעסוקתי והשתלבות בעבודה בשוק החופשי דרוש/ה איש/ת מקצוע-",
        jobScope: "100%",
        location: "אשקלון/שדרות",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 224,
        description: 'לצוות התעסוקה הנתמכת, דרוש/ה רכז/ת מקצועי/ת',
        jobScope: "100%",
        location: "באר שבע והסביבה",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 102,
        description: 'לתכנית ייחודית לצעירים "הד" דרוש/ה מדריך/ה',
        jobScope: "50% - 100%",
        location: "לוד",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 225,
        description: 'לתכנית ייחודית המשלבת צעירים עם מגבלה בצה"ל דרוש/ה רכז/ת',
        jobScope: "50%",
        location: "מרחב השפלה",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 3,
        description: 'הצטרפו לצוות המדריכים החברתיים במכינת "דרור"',
        jobScope: "פעמיים בשבוע בשעות הצהריים/ערב ומשמרות לילה.\nמתאים לסטודנטים!",
        location: "שדרות והסביבה",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 130,
        description: 'למרכז נוער ייחודי, דרוש/ה מדריך/ת נוער',
        jobScope: 'כ- 25 ש"ש עם אפשרות להרחבת המשרה',
        location: "שדרות",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 136,
        description: 'לתכנית ייחודית לצעירים על הרצף האוטיסטי בתפקוד גבוה, דרוש/ה רכז/ת',
        jobScope: "100%",
        location: "מודיעין",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 121,
        description: 'לתכנית ליווי קהילתי, דרושים/ות עו"סים/ות אנשי/נשות מקצוע מתחום הטיפול והשיקום',
        jobScope: "100%",
        location: "שדרות / אשקלון / קרית מלאכי",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 64,
        description: 'הצטרפו לצוות המדריכים החברתיים בעתלית',
        jobScope: "חלקי",
        location: "עתלית",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 159,
        description: "לתכנית 'הד' לצעירים, דרוש/ה רכז/ת לליווי צעירים שמתמודדים עם קשיים נפשיים, ומשתלבים במכינה לחיים עצמאיים",
        jobScope: "80% - 100%",
        location: "לוד",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 96,
        description: 'הצטרפו לצוות המדריכים במכינת "דרור" רמת גן!',
        jobScope: "50%\nמתאים לסטודנטים!",
        location: "רמת גן",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 197,
        description: 'למערך התעסוקה הנתמכת של עמותת גוונים, דרוש/ה עובד/ת מקצועי/ת',
        jobScope: "50%",
        location: "אשדוד / קרית מלאכי / קרית גת",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 144,
        description: 'הצטרפו לצוות המדריכים החברתיים , במכינת "כנפיים"',
        jobScope: "פעמיים בשבוע בשעות אחר הצהריים/ערב ומשמרת לילה",
        location: "שדרות",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 163,
        description: "ל'בית לחיים' בעתלית דרוש/ה רכז/ת",
        jobScope: "75%\nתחילת העבודה - מיידי",
        location: "עתלית",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 100,
        description: 'לתכנית ייחודית המלווה אנשים עם מגבלה בהגשמת חלומם התעסוקתי והשתלבות בעבודה בשוק החופשי דרוש/ה מנהל/ת',
        jobScope: "100%",
        location: "באר שבע והסביבה",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 105,
        description: 'הצטרפו לצוות המדריכים החברתיים במכינת "דרור" מודיעין!',
        jobScope: "משמרות",
        location: "מודיעין",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 76,
        description: 'דרוש/ה עו"ס לתכנית דיור ייחודית בעתלית',
        jobScope: "100%",
        location: "עתלית",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 178,
        description: 'למרחב חינוכי תכלי"ת דרוש/ה מדריך/ה לקבוצת נערות מהחינוך המיוחד',
        jobScope: 'חלקי (כ-22 ש"ש)',
        location: "שדרות",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 221,
        description: "לתכנית דיור 'דרור' מכינה לחיים עצמאיים לצעירים על הרצף האוטיסטי דרוש/ה עו\"ס",
        jobScope: "100%",
        location: "ראשון לציון",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 220,
        description: 'לצוות התעסוקה הנתמכת של עמותת גוונים, דרוש/ה רכז/ת מקצועי/ת',
        jobScope: "80%",
        location: "איזור אשדוד / קרית מלאכי / קרית גת",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 49,
        description: 'ל"בית לחיים" דרושים/ות מדריכים/ות חברתיים לעבודה עם אנשים עם הנמכה שכלית התפתחותית',
        jobScope: 'עבודה במשמרות בוקר, צהריים, ערב ולילה כולל סופ"ש, לעיתים רחוקות.',
        location: "שדרות",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 212,
        description: 'לתכנית דיור ייחודית המלווה צעירים על הרצף האוטיסטי, דרוש/ה רכז/ת',
        jobScope: "50% - 100%",
        location: "ראשון לציון",
        datePosted: new Date('2023-02-13')
    },
    {
        id: 211,
        description: 'בואו להיות חלק מצוות איכותי ומשמעותי בתכנית דיור לצעירים על הרצף האוטיסי בתפקוד גבוה',
        jobScope: "עבודה במשמרות אחר הצהריים/ערב ובמשמרות לילה",
        location: "ראשון לציון",
        datePosted: new Date('2023-02-12')
    },
];

const locationsDB = [
    'שדרות',
    'חוף אשקלון',
    'אופקים',
    'קרית גת',
    'קרית מלאכי',
    'קרית גת',
    'אשדוד',
    'אשקלון',
    'באר שבע',
    'לוד',
    'מודיעין',
    'מרחב השפלה',
    'מרחב השרון',
    'עפולה',
    'עתלית',
    'ראשון לציון',
    'רמת גן',
];

export default { jobsDB, locationsDB }
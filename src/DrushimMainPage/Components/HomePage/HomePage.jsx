import React from 'react'
import './HomePage.css'
import { Typography } from '@mui/material'

export default function HomePage() {
    return (
        <div className="promo">
            <img alt='MainPage' src={require('../../Sources/banner1.png')} />
            <Typography className="description" varient="h5" align="center" color="textPrimary" paragraph>
                באתר זה תוכלו למצוא מגוון משרות המיועדות למגויסים שמעוניינים להיות חלק ממהלך התרומה לקהילה. <br /><br />עמותת גוונים מציעה מגוון רחב של משרות המתאימות למגוון רחב של צרכים ומיועדות לאנשים עם מוגבלויות וגם לאנשים שמעוניינים לעזור לקהילה. לחצו כעת כדי לראות את המשרות הזמינות ולהצטרף למאמץ התרומה לקהילה יחד עם עמותת גוונים.
            </Typography>
        </div>

    )
}
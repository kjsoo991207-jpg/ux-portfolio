const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../content/projects.ts')
let s = fs.readFileSync(filePath, 'utf8')
const u = '\u2019' // curly apostrophe

// Section 05
const old05 = `        {
          number: '05',
          title: 'From Tracking to Autopilot',
          body: 'Habits become automatic over time — studies say about 59–66 days. I added a reinforcement phase: once a habit sticks, it can leave the active list. Progress is "who you${u}re becoming," not a number that resets. That keeps people going long-term.',
          image: '/images/aika/aika-reinforcement.png',
          caption: 'Habit detail: Reinforcement phase with James Clear model, progress to automatic behavior, and log calendar (green = done, red = slips).',
        },`
const new05 = `        {
          number: '05',
          title: 'From Tracking to Autopilot',
          body: 'Habits become automatic over time—research suggests an average of around 66 days, with wide variation. I added a reinforcement phase: once a habit sticks, it can leave the active list. Progress is "who you\\'re becoming," not a number that resets.',
          rationale: 'Lally et al. (European Journal of Social Psychology, 2010) showed that automaticity develops through repeated context-dependent behavior; consistency matters more than perfection. Designing for this timeline—reinforcement, then autopilot—supports long-term behavior change instead of short-term tracking.',
          sources: [
            { label: 'How long does it take to form a habit? (UCL)', url: 'https://www.ucl.ac.uk/news/2009/aug/how-long-does-it-take-form-habit' },
            { label: 'Lally et al., habit formation (University of Surrey)', url: 'https://www.surrey.ac.uk/news/does-it-really-take-66-days-form-habit-we-asked-expert-dr-pippa-lally' },
          ],
          image: '/images/aika/aika-reinforcement.png',
          caption: 'Habit detail: Reinforcement phase with James Clear model, progress to automatic behavior, and log calendar (green = done, red = slips).',
        },`

// Section 08
const old08 = `        {
          number: '08',
          title: 'Streak System (Reimagined)',
          body: 'When a streak breaks, many people quit for good. I shifted to growth stages (Baby Seed → Sprout Scout → Leafy Rookie) that don${u}t reset. You progress even with slips. Identity-based, not a number that can shatter.',
          image: '/images/aika/aika-streak.png',
          caption: 'Streak progression: Baby Seed → Sprout Scout → Leafy Rookie with identity-based milestones.',
        },`
const new08 = `        {
          number: '08',
          title: 'Streak System (Reimagined)',
          body: 'When a streak breaks, many people quit. I moved to growth stages (Baby Seed → Sprout Scout → Leafy Rookie) that don\\'t reset. You progress even with slips. Identity-based, not a number that can shatter.',
          rationale: 'Streak counters can increase short-term consistency but trigger "what-the-hell" effects when broken—users often quit entirely. Design that prioritizes forgiveness and identity over a resetting number supports Streak Recovery Rate and long-term habit maintenance.',
          sources: [
            { label: 'Why most habit streaks fail (Moore Momentum)', url: 'https://mooremomentum.com/blog/why-most-habit-streaks-fail-and-how-to-build-ones-that-dont/' },
            { label: 'Why we don\\'t do streaks like other apps (Nova)', url: 'https://similar-role-645457.framer.app/resources/why-gratty-doesnt-do-streaks-freeze-feature' },
          ],
          image: '/images/aika/aika-streak.png',
          caption: 'Streak progression: Baby Seed → Sprout Scout → Leafy Rookie with identity-based milestones.',
        },`

if (s.includes(old05)) {
  s = s.replace(old05, new05)
  console.log('Patched 05')
} else {
  console.log('05 not found')
}
if (s.includes(old08)) {
  s = s.replace(old08, new08)
  console.log('Patched 08')
} else {
  console.log('08 not found')
}
fs.writeFileSync(filePath, s)

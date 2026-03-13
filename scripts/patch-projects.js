const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../content/projects.ts')
let s = fs.readFileSync(filePath, 'utf8')
const unicodeApo = '\u2019'
const oldIntro = "      solutionIntro:\n        'One score. Easy ways to log. Feedback that helps instead of shaming. Progress that doesn" + unicodeApo + "t reset when you miss a day. Here" + unicodeApo + "s how:',"
const newIntro = `      designGoal:
        'To give people one place for healthspan—one number they can trust, habits that adapt to their life, and feedback that supports instead of shaming—so that staying healthy feels sustainable, not like a second job.',
      problemMoment: {
        title: 'Streak reset made people quit for good',
        body: "At first I assumed streak counters would motivate users. But research and testing showed the opposite: when a streak breaks, many people don't just miss one day—they abandon the app entirely. Loss aversion makes the \\"reset to zero\\" feel like total failure. So I stopped treating the streak number as the goal. I shifted to growth stages (Baby Seed → Sprout Scout → Leafy Rookie) that don't reset on a missed day, and reframed language from \\"failed\\" to \\"slips.\\" The aim was to keep people coming back instead of punishing them for being human.",
        beforeLabel: 'Before: streak resets to zero → users quit',
        afterLabel: "After: identity-based stages that don't reset",
      },
      solutionIntro:
        'One score. Easy ways to log. Feedback that helps instead of shaming. Progress that doesn' + unicodeApo + 't reset when you miss a day. Below is how each part was designed and why.',`

if (s.includes(oldIntro)) {
  s = s.replace(oldIntro, newIntro)
  fs.writeFileSync(filePath, s)
  console.log('Patched designGoal + problemMoment + solutionIntro')
} else {
  console.log('Old block not found')
  console.log('First 200 chars of expected:', JSON.stringify(oldIntro.slice(0, 200)))
}

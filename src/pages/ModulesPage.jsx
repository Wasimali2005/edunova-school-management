import ModulesHero from './modules/ModulesHero'
import ModulesGrid from './modules/ModulesGrid'

/**
 * ModulesPage — showcases all EduNova school management modules.
 */
export default function ModulesPage() {
  return (
    <main id="main-content">
      <ModulesHero />
      <ModulesGrid />
    </main>
  )
}

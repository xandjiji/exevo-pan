import { useState } from 'react'
import { Input, Button, NumericInput } from 'components/Atoms'
import { ChipGroup } from 'components/Organisms'
import { TibiaIcons } from 'assets/svgs'
import {
  vocationOptions,
  skillOptions,
  pvpOptions,
  locationOptions,
} from '../../options'

/* @ ToDo:

- break club/axe/sword?
- charm points?
- min tc invested?

- result states
    loading
    success
    failed

- reset button
- similar results

*/

const AuctionEstimation = () => {
  const [vocation, setVocation] = useState<string>()
  const [skill, setSkill] = useState<string>()
  const [minSkill, setMinSkill] = useState<number>()
  const [maxSkill, setMaxSkill] = useState<number>()
  const [minLevel, setMinLevel] = useState<number>()
  const [maxLevel, setMaxLevel] = useState<number>()
  const [pvp, setPvp] = useState<string>()
  const [battleye, setBattleye] = useState<string>()
  const [location, setLocation] = useState<string>()

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <ChipGroup
          label="PvP"
          toggleable
          options={pvpOptions}
          value={pvp}
          onChange={(e) => setPvp(e.target.value)}
        />
        <ChipGroup
          label="BattlEye"
          toggleable
          options={[
            {
              /* @ ToDo: i18n */
              name: (
                <>
                  <TibiaIcons.BattlEye color="battleGreen" /> Verde
                </>
              ),
              value: 'true',
            },
            {
              name: (
                <>
                  <TibiaIcons.BattlEye color="battleYellow" /> Amarelo
                </>
              ),
              value: 'false',
            },
          ]}
          value={battleye}
          onChange={(e) => setBattleye(e.target.value)}
        />
        <ChipGroup
          label="Localização do servidor"
          toggleable
          options={locationOptions}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        <ChipGroup
          label="Vocation"
          toggleable
          options={vocationOptions}
          value={vocation}
          onChange={(e) => setVocation(e.target.value)}
        />

        <ChipGroup
          label="Skill"
          toggleable
          options={skillOptions}
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <div className="xs:flex-row xs:gap-8 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <NumericInput
              label="Min skill"
              alwaysValid
              step={5}
              value={minSkill}
              onChange={setMinSkill}
              className="max-w-[64px]"
            />
            <NumericInput
              label="Max skill"
              alwaysValid
              step={5}
              value={maxSkill}
              onChange={setMaxSkill}
              className="max-w-[64px]"
            />
          </div>
          <div className="flex gap-3">
            <NumericInput
              label="Min level"
              alwaysValid
              step={50}
              value={minLevel}
              onChange={setMinLevel}
              className="max-w-[64px]"
            />
            <NumericInput
              label="Max level"
              alwaysValid
              step={50}
              value={maxLevel}
              onChange={setMaxLevel}
              className="max-w-[64px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionEstimation

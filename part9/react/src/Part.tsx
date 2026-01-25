import type { PartProps } from "./types"
import { assertNever } from "./utils"

const Part = (props: PartProps) => {
  const header = (
    <h2>
        {props.part.name} {props.part.exerciseCount}
    </h2>
  )

  switch (props.part.kind) {
    case 'basic':
      return (
        <div>
          {header}
          <p>
            <em>
              {props.part.description}
            </em>
          </p>
        </div>
      )
    case 'group':
      return (
        <div>
          {header}
          <p>
            project exercises {props.part.groupProjectCount}
          </p>
        </div>
      )
    case 'background':
      return (
        <div>
          {header}
          <p>
            <em>
              {props.part.description}
            </em>
          </p>
          <p>
            submit to {props.part.backgroundMaterial}
          </p>
        </div>
      )

    case 'special':
      return (
        <div>
          {header}
          <p>
            <em>
              {props.part.description}
            </em>
          </p>
          <p>
            required skills: {props.part.requirements.join(', ')}
          </p>
        </div>
      )
    default:
      return assertNever(props.part)
  }
}

export default Part

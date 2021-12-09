import Store from 'electron-store'
import { JSONSchemaType } from 'json-schema-typed'

const schema = {
  theme: {
    type: JSONSchemaType.String,
    default: 'omni'
  }
}

const config = new Store({
  schema,
  watch: true
})

export { schema, config }
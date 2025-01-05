import { setMetadata } from '../core/metadata/metadata'
import { PROTECTED_METADATA_KEY } from '../utils/constants'

export const Protected = (): ClassDecorator & MethodDecorator =>
  setMetadata(PROTECTED_METADATA_KEY, true)

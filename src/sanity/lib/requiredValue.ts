const requiredValue = {
    validate: <T extends { required: () => void },>(Rule: T) => Rule.required(),
}

export default requiredValue;
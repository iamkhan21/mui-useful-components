# MUI Useful Components

`mui-useful-components` is a library of React components built on top of Material-UI (MUI). It provides additional functionality, features, and styles that are not included in the standard MUI package, helping developers save time and improve their application's UI/UX.

---

## Features

- **Extended Components:** Build upon existing MUI components with added functionality.
- **Custom Styling:** Tailored components that align with Material Design principles but fill in MUI's gaps.
- **Plug-and-Play:** Seamlessly integrate these components into your existing MUI project.
- **Fully Customizable:** Adjust styles and behaviors to meet your specific requirements.

---

## Installation

To use these components in your project, install the package via npm:

```bash
npm install mui-useful-components
```

---

## Components
### **PinInput**
A versatile and interactive PIN input component that can handle user input character-by-character, providing a seamless experience for entering OTPs or similar codes.

```tsx
import PinInput from 'mui-useful-components';

const PIN_SCHEME = [0, 1, 2, 3, 4, 5];

<PinInput.Root onValueComplete={handlePinComplete} onlyDigits>
    <PinInput.Label>Enter your OTP</PinInput.Label>
    <PinInput.Control>
        {PIN_SCHEME.map((_, index) => (
            <PinInput.Input key={index} index={index} />
        ))}
    </PinInput.Control>
</PinInput.Root>
```

---

## Usage

Each component is designed to integrate seamlessly with Material-UI's theme and styling system. Simply import the components you need and start using them in your project.

```tsx
import { PinInput } from 'mui-useful-components';
```

For detailed component documentation and examples, check out the [documentation](#) (add link when available).

---

## Contributing

We welcome contributions! To report a bug, request a feature, or contribute code, please:

1. Fork the repository.
2. Create a new branch (`feature/some-feature` or `fix/bug-name`).
3. Commit your changes and submit a pull request.

Feel free to open an issue to discuss potential changes or ideas before starting.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Support

If you encounter any issues or have questions, please open an issue on GitHub. We’d love to hear your feedback!

---
Enjoy building your amazing UI with `mui-useful-components`!

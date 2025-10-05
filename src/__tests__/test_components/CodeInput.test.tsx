import React, { useState, useRef } from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CodeInput, CodeInputHandle } from "../../components/CodeInput";
import '@testing-library/jest-dom';

const CodeInputWrapper = ({ onComplete }: any) => {
  const [value, setValue] = useState<(string | null)[]>([null, null, null, null]);

  const handleChange = (newValue: (string | null)[]) => {
    setValue(newValue);
  };

  return (
    <CodeInput
      value={value}
      onChange={handleChange}
      onComplete={onComplete}
    />
  );
};

const RefWrapper = () => {
  const codeInputRef = useRef<CodeInputHandle>(null);
  return (
    <>
      <CodeInput value={['', '']} ref={codeInputRef} />
      <button onClick={() => codeInputRef.current?.focusOnFirstInput()}>Focus</button>
    </>
  );
};

jest.useFakeTimers();

describe("CodeInput", () => {
  it("renders the correct number of input fields", () => {
    render(<CodeInput value={[null, null, null, null]} />);
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs).toHaveLength(4);
  });

  it("updates the value and moves focus to the next input on change", () => {
    const handleChange = jest.fn();
    const value = [null, null, null, null];

    render(<CodeInput value={value} onChange={handleChange} />);

    const inputs = screen.getAllByRole("spinbutton");
    const firstInput = inputs[0];
    const secondInput = inputs[1];

    fireEvent.change(firstInput, { target: { value: '1' } });

    expect(handleChange).toHaveBeenCalledWith(['1', null, null, null]);
    expect(secondInput).toHaveFocus();
  });

  it("calls onComplete when all fields are filled", async () => {
    const handleComplete = jest.fn();
    render(<CodeInputWrapper onComplete={handleComplete} />);
    const inputs = screen.getAllByRole("spinbutton");

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });

    await waitFor(() => {
      expect(handleComplete).toHaveBeenCalledWith(['1', '2', '3', '4']);
    });
  });

  it("formats input to allow only single digits", () => {
    const handleChange = jest.fn();
    const value = [null];
    render(<CodeInput value={value} onChange={handleChange} />);
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalledWith(['3']);
  });

  it("exposes a function to focus on the first input via ref", () => {
    render(<RefWrapper />);
    const inputs = screen.getAllByRole("spinbutton");
    const focusButton = screen.getByText('Focus');

    expect(inputs[0]).not.toHaveFocus();
    fireEvent.click(focusButton);
    expect(inputs[0]).toHaveFocus();
  });

  it("executes the handleClick logic when an input is clicked", () => {
    const value = ['1'];
    render(<CodeInput value={value} />);
    const input = screen.getByRole("spinbutton");

    fireEvent.click(input);
    jest.runAllTimers();
  });
});
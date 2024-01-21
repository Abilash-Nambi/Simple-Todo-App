type Props = {
  type: "submit" | "reset" | "button" | undefined;
  children: string;
};

const Button = ({ type, children }: Props) => {
  return (
    <button className="todo_button" type={type}>
      {children}
    </button>
  );
};

export default Button;

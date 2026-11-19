// Blocks available for usage

export const EVENTS = {
  ROCKET_LAUNCH: 'ROCKET_LAUNCH'
};

export const BLOCK_NAMES = {
  BRIDGE: 'BUILD_BRIDGE',
  FORWARD: 'FORWARD',
  FORWARD_VAR: 'FORWARD_VAR',
  INCREMENT_VAR: 'INCREMENT_VAR',
  TAKE_PHOTO: 'TAKE_PHOTO',
  TURN: 'TURN',
  LAUNCH_ROCKET: 'LAUNCH_ROCKET',
  PICK_UP: 'PICK_UP',
  DROP: 'DROP',
  PRESS_BUTTON: 'PRESS_BUTTON',
  REPEAT: 'REPEAT',
  END_REPEAT: 'END REPEAT',
  IF_BUTTON_BLUE: 'IF_BUTTON_BLUE',
  IF_CARRYING_BLUE: 'IF_CARRYING_BLUE',
  IF_ICE: 'IF_ICE',
  ELSE: 'ELSE',
  END_IF: 'END_IF',
};

export const BLOCKS = {

  [BLOCK_NAMES.BRIDGE]: {
    name: 'Bắc cầu'
  },
  [BLOCK_NAMES.FORWARD]: {
    name: 'Tiến lên một bước'
  },

  // TEMP: These two blocks are hard-coded to use the variable `x`.
  // The program technically supports multiple variables, but not currently in use.
  // If they're ever put into use, replace these `x`s in the `name` with the more generic "Variable"
  [BLOCK_NAMES.FORWARD_VAR]: {
    name: 'Đi x bước',
    args: [
      {'key': 'var', 'text': 'Tên biến là gì?'}
    ]
  },
  [BLOCK_NAMES.INCREMENT_VAR]: {
    name: 'Tăng x thêm 1',
    args: [
      {'key': 'var', 'text': 'Tên biến là gì?'}
    ]
  },

  [BLOCK_NAMES.TURN]: {
    name: 'Quay đầu'
  },
  [BLOCK_NAMES.PICK_UP]: {
    name: 'Nhặt vật'
  },
  [BLOCK_NAMES.DROP]: {
    name: 'Thả vật'
  },
  [BLOCK_NAMES.LAUNCH_ROCKET]: {
    name: 'Phóng tên lửa'
  },
  [BLOCK_NAMES.TAKE_PHOTO]: {
    name: 'Chụp ảnh'
  },
  [BLOCK_NAMES.PRESS_BUTTON]: {
    name: 'Bấm nút'
  },
  [BLOCK_NAMES.REPEAT]: {
    name: 'Lặp lại',
    args: [
      {'key': 'count', 'text': 'Lặp lại bao nhiêu lần?'}
    ]
  },
  [BLOCK_NAMES.END_REPEAT]: {
    name: 'Kết thúc lặp'
  },
  [BLOCK_NAMES.IF_BUTTON_BLUE]: {
    name: 'Nếu nút màu xanh'
  },
  [BLOCK_NAMES.IF_CARRYING_BLUE]: {
    name: 'Nếu đang mang vật xanh'
  },
  [BLOCK_NAMES.IF_ICE]: {
    name: 'Nếu phát hiện băng'
  },
  [BLOCK_NAMES.ELSE]: {
    name: 'Nếu không'
  },
  [BLOCK_NAMES.END_IF]: {
    name: 'Kết thúc nếu'
  },
}

export const remaining_blocks = (blocks, program) => {

  // Count up how many times each block is currently used in the program
  const counts = {};
  for (let i = 0; i < program.length; i++) {
    const block = program[i].block;
    if (counts[block] === undefined) {
      counts[block] = 1;
    } else {
      counts[block]++;
    }
  }

  // Remove
  return blocks.reduce((acc, [block, count]) => (
    [...acc, [block, count - (counts[block] || 0)]]
  ), []);
}

export const instruction_label = ({ block, args }) => {
  const name = BLOCKS[block].name;
  switch (block) {
    case BLOCK_NAMES.REPEAT:
      return `${name} ${args.count}`;

    case BLOCK_NAMES.FORWARD_VAR:
      return `Đi ${args.var} bước`;

    case BLOCK_NAMES.INCREMENT_VAR:
      return `Tăng ${args.var} thêm 1`;

    default:
      return name;
  }
}

// Check if a program is structurally correct
// e.g. ensure all repeat blocks have an 'end repeat'
// This function also adds metadata to block that's useful for execution
// e.g. for 'end' blocks, keep tracks of where the jump back to should be
export const validate_program = (program, variables) => {
  const augmentedProgram = [];
  const stack = [];
  for (let i = 0; i < program.length; i++) {

    // Make a copy of the instruction before mutation
    const instruction = Object.assign({}, program[i]);
    instruction.meta = {id: i};

    if (instruction.args.var !== undefined) {
      let found = false;
      for (const variable of variables) {
        if (variable.name === instruction.args.var) {
          found = true;
        }
      }
      if (!found) {
        return {isValid: false, error: `Tenacity không có biến nào tên là ${instruction.args.var}`};
      }
    }

    let top;
    switch (instruction.block) {

      case BLOCK_NAMES.REPEAT:
        stack.push({type: BLOCK_NAMES.REPEAT, line: i});
        const count = parseInt(instruction.args.count);
        if (isNaN(count)) {
          return {isValid: false, error: 'Số lần lặp phải là một số nguyên!'};
        }
        instruction.args.count = count;
        break;

      case BLOCK_NAMES.END_REPEAT:
        top = stack.pop();
        if (top === undefined) {
          return {isValid: false, error: 'Chỉ có thể dùng Kết thúc lặp sau một khối Lặp lại tương ứng.'};
        }
        else if (top.type !== BLOCK_NAMES.REPEAT) {
          return {isValid: false, error: 'Tenacity muốn Kết thúc lặp, nhưng có một phần khác của chương trình cần được đóng lại trước.'};
        }
        instruction.meta.jumpBackTo = top.line;
        augmentedProgram[top.line].meta.jumpTo = i + 1;
        break;

      case BLOCK_NAMES.IF_BUTTON_BLUE:
      case BLOCK_NAMES.IF_CARRYING_BLUE:
      case BLOCK_NAMES.IF_ICE:
        stack.push({type: instruction.block, condition: true, line: i});
        break;

      case BLOCK_NAMES.ELSE:
        top = stack.pop();
        if (top === undefined) {
          return {isValid: false, error: 'Chỉ có thể dùng Nếu không sau một khối Nếu tương ứng.'};
        }
        else if (top.condition !== true) {
          return {isValid: false, error: 'Tenacity muốn dùng Nếu không, nhưng có một phần khác của chương trình cần được đóng lại trước.'};
        }
        else if (augmentedProgram[top.line].meta.elseJump !== undefined) {
          return {isValid: false, error: 'Mỗi khối Nếu chỉ có thể có một khối Nếu không.'};
        }
        augmentedProgram[top.line].meta.elseIndex = i;
        augmentedProgram[top.line].meta.elseJump = i + 1;
        stack.push(top);
        break;

      case BLOCK_NAMES.END_IF:
        top = stack.pop();
        if (top === undefined) {
          return {isValid: false, error: 'Chỉ có thể dùng Kết thúc nếu sau một khối Nếu tương ứng.'};
        }
        else if (top.condition !== true) {
          return {isValid: false, error: 'Tenacity muốn Kết thúc nếu, nhưng có một phần khác của chương trình cần được đóng lại trước.'};
        }
        augmentedProgram[top.line].meta.jumpTo = i + 1;
        const elseIndex = augmentedProgram[top.line].meta.elseIndex;
        if (elseIndex !== undefined) {
          augmentedProgram[elseIndex].meta.jumpTo = i + 1;
        }
        break;

      default:
        break;
    }

    augmentedProgram.push(instruction);
  }

  // Make sure nothing is left on the stack
  const top = stack.pop();
  if (top !== undefined) {
    if (top.type === BLOCK_NAMES.REPEAT) {
      return {isValid: false, error: 'Có khối Lặp lại nhưng thiếu khối Kết thúc lặp để biết khi nào dừng lặp.'};
    }
    else if (top.condition === true) {
      return {isValid: false, error: 'Có khối Nếu nhưng thiếu khối Kết thúc nếu để biết khi nào điều kiện kết thúc.'};
    }
    else {
      // TODO: Shouldn't ever come up, but make this error more descriptive just in case.
      return {isValid: false, error: 'Chương trình có lỗi.'};
    }
  }

  return {isValid: true, augmentedProgram}
}
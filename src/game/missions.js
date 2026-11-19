// Game is divided into Planets and Missions

import { BLOCK_NAMES, EVENTS } from './blocks';
import { OBJECTS } from './objects';

// Defaults for objects
const defaults = {
  elevation: 0,
  opacity: 1,
  costumeNumber: 0,
}
const d = defaults;

export const PLANETS = [
  {
    name: 'Sao Thủy',
    introConfig: {
      size: 15,
      scale: 2,
      orbitDuration: 10000,
      textColor: 'black'
    },
    colors: {
      main: '#bfbaac',
      sky: '#7d705b',
      text: 'black'
    },
    briefing: 'Xe tự hành Tenacity đã đến Sao Thủy. Hãy dùng bảng điều khiển để giúp Tenacity hoàn thành nhiệm vụ.',
    missions: [
      {
        objective: 'Đưa Tenacity quay về tàu vũ trụ để tiếp nhiên liệu.',
        hint: 'Bấm vào một khối lệnh để thêm vào chương trình của Tenacity. Khi xong, bấm "Chạy chương trình".',
        blocks: [
          [BLOCK_NAMES.FORWARD, 2]
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 500},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 300},
        ],
        criteria: [
          {category: 'rover_x', value: 500, message: 'Tenacity chưa về tới tàu vũ trụ.'}
        ]
      },
      {
        objective: 'Đến gần hố thiên thạch để khám phá. Nhưng cẩn thận đừng rơi xuống!',
        blocks: [
          [BLOCK_NAMES.FORWARD, 5]
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 100},
          {...d, id: 'crater', object: OBJECTS.MERCURY_CRATER, x: 500, elevation: -30, allowFall: true},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 100},
        ],
        criteria: [
          {category: 'rover_x', value: 400, message: 'Tenacity chưa đến đủ gần hố thiên thạch.'}
        ]
      },
      {
        objective: 'Mang mẫu đá về lại tên lửa.',
        blocks: [
          [BLOCK_NAMES.FORWARD, 5],
          [BLOCK_NAMES.PICK_UP, 1],
          [BLOCK_NAMES.TURN, 1]
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 100},
          {...d, id: 'crater', object: OBJECTS.MERCURY_CRATER, x: 500, elevation: -30, allowFall: true},
          {...d, id: 'rock', object: OBJECTS.ROCK_RED, x: 400, elevation: -30, canCarry: true},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 400},
        ],
        criteria: [
          {category: 'rover_x', value: 100, message: 'Tenacity chưa về tới tên lửa.'},
          {category: 'rover_carry', value: 'rock', message: 'Tenacity chưa mang mẫu đá.'},
        ]
      },
      {
        objective: 'Xong việc ở Sao Thủy! Hãy phóng tên lửa để đến hành tinh tiếp theo.',
        blocks: [
          [BLOCK_NAMES.LAUNCH_ROCKET, 1]
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 400},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 400},
        ],
        criteria: [
          {category: 'event', value: EVENTS.ROCKET_LAUNCH, message: 'Tên lửa chưa được phóng.'}
        ]
      }
    ]
  },
  {
    name: 'Sao Kim',
    introConfig: {
      size: 20,
      scale: 1.7,
      orbitDuration: 28900,
      textColor: 'black'
    },
    colors: {
      main: '#ae7c43',
      sky: '#dbb78f',
      text: 'black'
    },
    briefing: 'Chào mừng đến Sao Kim! Nhiệm vụ của Tenacity là khám phá các ngọn núi lửa trên hành tinh này.',
    missions: [
      {
        objective: 'Đến chân núi lửa và chụp một bức ảnh.',
        hint: 'Để lặp lại một đoạn chương trình nhiều lần, hãy đặt nó giữa khối "Lặp lại" và "Kết thúc lặp".',
        blocks: [
          [BLOCK_NAMES.FORWARD, 1],
          [BLOCK_NAMES.TAKE_PHOTO, 1],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
        ],
        items: [
          {...d, id: 'volcano', object: OBJECTS.VOLCANO, x: 700},
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 100},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 200},
        ],
        criteria: [
          {category: 'photograph', value: 700, message: 'Tenacity chưa chụp ảnh núi lửa.'},
        ]
      },
      {
        objective: 'Thu thập mẫu đá.',
        blocks: [
          [BLOCK_NAMES.FORWARD, 2],
          [BLOCK_NAMES.BRIDGE, 1],
          [BLOCK_NAMES.PICK_UP, 1],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
        ],
        items: [
          {...d, id: 'crater', object: OBJECTS.VENUS_CRATER, x: 300, allowFall: true, elevation: -30},
          {...d, id: 'rock', object: OBJECTS.ROCK_RED, x: 600, elevation: -30, canCarry: true},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 100},
        ],
        criteria: [
          {category: 'rover_carry', value: 'rock', message: 'Tenacity chưa mang mẫu đá.'},
        ]
      },
      {
        objective: 'Chụp ảnh cả năm ngọn núi lửa.',
        blocks: [
          [BLOCK_NAMES.FORWARD, 3],
          [BLOCK_NAMES.TURN, 2],
          [BLOCK_NAMES.TAKE_PHOTO, 1],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
        ],
        items: [
          {...d, id: 'volcano1', object: OBJECTS.VOLCANO, x: 200},
          {...d, id: 'volcano2', object: OBJECTS.VOLCANO, x: 300},
          {...d, id: 'volcano3', object: OBJECTS.VOLCANO, x: 400},
          {...d, id: 'volcano4', object: OBJECTS.VOLCANO, x: 500},
          {...d, id: 'volcano5', object: OBJECTS.VOLCANO, x: 600},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 400},
        ],
        criteria: [
          {category: 'photograph', value: 200, message: 'Tenacity chưa chụp ảnh đủ các núi lửa.'},
          {category: 'photograph', value: 300, message: 'Tenacity chưa chụp ảnh đủ các núi lửa.'},
          {category: 'photograph', value: 400, message: 'Tenacity chưa chụp ảnh đủ các núi lửa.'},
          {category: 'photograph', value: 500, message: 'Tenacity chưa chụp ảnh đủ các núi lửa.'},
          {category: 'photograph', value: 600, message: 'Tenacity chưa chụp ảnh đủ các núi lửa.'},
        ]
      },
      {
        objective: 'Mang cả hai mẫu đá về thả ở chỗ tên lửa.',
        hint: 'Tenacity mỗi lần chỉ mang được một vật.',
        blocks: [
          [BLOCK_NAMES.FORWARD, 5],
          [BLOCK_NAMES.TURN, 1],
          [BLOCK_NAMES.BRIDGE, 1],
          [BLOCK_NAMES.PICK_UP, 1],
          [BLOCK_NAMES.DROP, 1],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
        ],
        items: [
          {...d, id: 'crater1', object: OBJECTS.VENUS_CRATER, x: 500, allowFall: true, elevation: -30},
          {...d, id: 'rock1', object: OBJECTS.ROCK_BLUE, x: 600, elevation: -30, canCarry: true},
          {...d, id: 'crater2', object: OBJECTS.VENUS_CRATER, x: 300, allowFall: true, elevation: -30},
          {...d, id: 'rock2', object: OBJECTS.ROCK_BLUE, x: 200, elevation: -30, canCarry: true},
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 400},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 400},
        ],
        criteria: [
          {category: 'location_x', id: 'rock1', value: 400, message: 'Chưa thả đủ hai mẫu đá ở chỗ tên lửa.'},
          {category: 'location_x', id: 'rock2', value: 400, message: 'Chưa thả đủ hai mẫu đá ở chỗ tên lửa.'},
        ]
      },
      {
        objective: 'Xong việc ở Sao Kim! Hãy phóng tên lửa để đến hành tinh tiếp theo.',
        blocks: [
          [BLOCK_NAMES.LAUNCH_ROCKET, 1]
        ],
        items: [
          {...d, id: 'crater1', object: OBJECTS.VENUS_CRATER, x: 500, allowFall: true, elevation: -30},
          {...d, id: 'crater2', object: OBJECTS.VENUS_CRATER, x: 300, allowFall: true, elevation: -30},
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 400},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 400},
        ],
        criteria: [
          {category: 'event', value: EVENTS.ROCKET_LAUNCH, message: 'Tên lửa chưa được phóng.'}
        ]
      }
    ]
  },
  {
    name: 'Trái Đất',
    introConfig: {
      size: 21,
      scale: 1.3,
      orbitDuration: 47000,
      textColor: 'black'
    },
    colors: {
      main: '#34bf9a',
      sky: '#9df2ee',
      text: 'black'
    },
    briefing: 'Xe tự hành Tenacity đã đến Trái Đất. Hãy giao các mẫu đá cho phòng thí nghiệm trước khi đến hành tinh tiếp theo.',
    missions: [
      {
        objective: 'Mở khóa phòng thí nghiệm: bấm tất cả các nút xanh mà không bấm nút đỏ.',
        hint: 'Các lệnh nằm giữa "Nếu" và "Kết thúc nếu" chỉ chạy khi điều kiện của "Nếu" đúng.',
        blocks: [
          [BLOCK_NAMES.FORWARD, 1],
          [BLOCK_NAMES.PRESS_BUTTON, 1],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
          [BLOCK_NAMES.IF_BUTTON_BLUE, 1],
          [BLOCK_NAMES.END_IF, 1],
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 100},
          {...d, id: 'lab', object: OBJECTS.LAB, x: 400},
          {...d, id: 'button1', object: OBJECTS.BUTTON_BLUE, x: 400, elevation: 70, button: true},
          {...d, id: 'button2', object: OBJECTS.BUTTON_RED, x: 500, elevation: 70, button: true},
          {...d, id: 'button3', object: OBJECTS.BUTTON_BLUE, x: 600, elevation: 70, button: true},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 300},
        ],
        criteria: [
          {category: 'button_press', id: 'button1', value: true, message: 'Tenacity chưa bấm hết các nút xanh.'},
          {category: 'button_press', id: 'button2', value: false, message: 'Tenacity đã bấm nhầm nút đỏ.'},
          {category: 'button_press', id: 'button3', value: true, message: 'Tenacity chưa bấm hết các nút xanh.'},
        ]
      },
      {
        objective: 'Có một mẫu đá trong hộp "Samples". Hãy chuyển nó vào hộp đúng màu.',
        hint: 'Đá đỏ bỏ vào hộp "Red", đá xanh bỏ vào hộp "Blue".',
        blocks: [
          [BLOCK_NAMES.FORWARD, 5],
          [BLOCK_NAMES.PICK_UP, 1],
          [BLOCK_NAMES.DROP, 1],
          [BLOCK_NAMES.IF_CARRYING_BLUE, 1],
          [BLOCK_NAMES.END_IF, 1],
        ],
        items: [
          {...d, id: 'rock', object: OBJECTS.ROCK_BLUE, x: 200, elevation: -50, canCarry: true, color: 'blue'},
          {...d, id: 'box_samples', object: OBJECTS.BOX_SAMPLES, x: 200, elevation: -100},
          {...d, id: 'box_red', object: OBJECTS.BOX_RED, x: 400, elevation: -100},
          {...d, id: 'box_blue', object: OBJECTS.BOX_BLUE, x: 500, elevation: -100},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 200},
        ],
        criteria: [
          {category: 'location_x', id: 'rock', value: 500, message: 'Mẫu đá chưa nằm trong hộp xanh.'},
        ]
      },
      {
        objective: 'Có một mẫu đá trong hộp "Samples". Hãy chuyển nó vào hộp đúng màu.',
        blocks: [
          [BLOCK_NAMES.FORWARD, 5],
          [BLOCK_NAMES.PICK_UP, 1],
          [BLOCK_NAMES.DROP, 1],
          [BLOCK_NAMES.IF_CARRYING_BLUE, 1],
          [BLOCK_NAMES.ELSE, 1],
          [BLOCK_NAMES.END_IF, 1],
        ],
        items: [
          {...d, id: 'rock', object: OBJECTS.ROCK_RED, x: 200, elevation: -50, canCarry: true, color: 'red'},
          {...d, id: 'box_samples', object: OBJECTS.BOX_SAMPLES, x: 200, elevation: -100},
          {...d, id: 'box_red', object: OBJECTS.BOX_RED, x: 500, elevation: -100},
          {...d, id: 'box_blue', object: OBJECTS.BOX_BLUE, x: 400, elevation: -100},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 200},
        ],
        criteria: [
          {category: 'location_x', id: 'rock', value: 500, message: 'Mẫu đá chưa nằm trong hộp đỏ.'},
        ]
      },
      {
        objective: 'Có ba mẫu đá trong hộp "Samples". Hãy chuyển từng mẫu vào hộp đúng màu.',
        blocks: [
          [BLOCK_NAMES.FORWARD, 7],
          [BLOCK_NAMES.TURN, 4],
          [BLOCK_NAMES.PICK_UP, 1],
          [BLOCK_NAMES.DROP, 2],
          [BLOCK_NAMES.IF_CARRYING_BLUE, 1],
          [BLOCK_NAMES.ELSE, 1],
          [BLOCK_NAMES.END_IF, 1],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
        ],
        items: [
          {...d, id: 'rock1', object: OBJECTS.ROCK_RED, x: 200, elevation: -50, canCarry: true, color: 'red'},
          {...d, id: 'rock2', object: OBJECTS.ROCK_BLUE, x: 200, elevation: -51, canCarry: true, color: 'blue'},
          {...d, id: 'rock3', object: OBJECTS.ROCK_RED, x: 200, elevation: -52, canCarry: true, color: 'red'},
          {...d, id: 'box_samples', object: OBJECTS.BOX_SAMPLES, x: 200, elevation: -100},
          {...d, id: 'box_red', object: OBJECTS.BOX_RED, x: 400, elevation: -100},
          {...d, id: 'box_blue', object: OBJECTS.BOX_BLUE, x: 500, elevation: -100},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 200},
        ],
        criteria: [
          {category: 'location_x', id: 'rock1', value: 400, message: 'Đá đỏ chưa nằm trong hộp đỏ.'},
          {category: 'location_x', id: 'rock2', value: 500, message: 'Đá xanh chưa nằm trong hộp xanh.'},
          {category: 'location_x', id: 'rock3', value: 400, message: 'Đá đỏ chưa nằm trong hộp đỏ.'},
        ]
      }, 
      {
        objective: 'Xong việc ở Trái Đất! Hãy phóng tên lửa để đến hành tinh tiếp theo.',
        blocks: [
          [BLOCK_NAMES.LAUNCH_ROCKET, 1]
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 400},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 400},
        ],
        criteria: [
          {category: 'event', value: EVENTS.ROCKET_LAUNCH, message: 'Tên lửa chưa được phóng.'}
        ]
      }
    ]
  },
  {
    name: 'Sao Hỏa',
    introConfig: {
      size: 11,
      scale: 1,
      orbitDuration: 88000,
      textColor: 'black'
    },
    colors: {
      main: '#942c25',
      sky: '#e67870',
      text: 'black'
    },
    briefing: 'Xe tự hành Tenacity đã đến Sao Hỏa, hành tinh cuối cùng của hành trình.',
    missions: [
      {
        objective: 'Chụp một bức ảnh ở chân ngọn núi.',
        hint: 'Tenacity lưu dữ liệu trong các biến, hiển thị ở góc trên bên phải. Một số khối lệnh cho phép nhập tên biến để điều khiển cách khối đó hoạt động.',
        variables: [
          {name: 'x', value: 0},
        ],
        blocks: [
          [BLOCK_NAMES.FORWARD_VAR, 1],
          [BLOCK_NAMES.INCREMENT_VAR, 4],
          [BLOCK_NAMES.TAKE_PHOTO, 1],
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 100},
          {...d, id: 'mountain', object: OBJECTS.MOUNTAIN, x: 500},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 200},
        ],
        criteria: [
          {category: 'photograph', value: 500, message: 'Tenacity chưa chụp ảnh ngọn núi.'},
        ]
      },
      {
        objective: 'Kiểm tra từng ngọn núi xem có băng không. Đặt biến x bằng số ngọn núi có băng.',
        variables: [
          {name: 'x', value: 0},
        ],
        blocks: [
          [BLOCK_NAMES.FORWARD, 1],
          [BLOCK_NAMES.INCREMENT_VAR, 2],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
          [BLOCK_NAMES.IF_ICE, 1],
          [BLOCK_NAMES.END_IF, 1],
        ],
        items: [
          {...d, id: 'mountain1', object: OBJECTS.MOUNTAIN, x: 200, ice: false},
          {...d, id: 'mountain2', object: OBJECTS.MOUNTAIN, x: 300, ice: true},
          {...d, id: 'mountain3', object: OBJECTS.MOUNTAIN, x: 400, ice: false},
          {...d, id: 'mountain4', object: OBJECTS.MOUNTAIN, x: 500, ice: true},
          {...d, id: 'mountain5', object: OBJECTS.MOUNTAIN, x: 600, ice: false},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 100},
        ],
        criteria: [
          {category: 'variable', id: 'x', value: 2, message: 'Tenacity tính x chưa đúng.'},
        ]
      },
      {
        objective: 'Chụp ảnh ở chân từng ngọn núi. Đừng chụp nhiều hơn mức cần thiết.',
        variables: [
          {name: 'x', value: 0},
        ],
        blocks: [
          [BLOCK_NAMES.FORWARD_VAR, 1],
          [BLOCK_NAMES.INCREMENT_VAR, 4],
          [BLOCK_NAMES.TAKE_PHOTO, 1],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 100},
          {...d, id: 'mountain1', object: OBJECTS.MOUNTAIN, x: 200},
          {...d, id: 'mountain2', object: OBJECTS.MOUNTAIN, x: 400},
          {...d, id: 'mountain3', object: OBJECTS.MOUNTAIN, x: 700},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 100},
        ],
        criteria: [
          {category: 'photograph', value: 200, message: 'Tenacity chưa chụp ảnh từng ngọn núi.'},
          {category: 'photograph', value: 400, message: 'Tenacity chưa chụp ảnh từng ngọn núi.'},
          {category: 'photograph', value: 700, message: 'Tenacity chưa chụp ảnh từng ngọn núi.'},
          {category: 'max_photographs', value: 3, message: 'Tenacity chụp quá nhiều ảnh.'},
        ]
      },
      {
        objective: 'Mang tất cả đá đỏ về chỗ tên lửa. Không được di chuyển đá xanh.',
        variables: [
          {name: 'x', value: 0},
        ],
        blocks: [
          [BLOCK_NAMES.FORWARD_VAR, 5],
          [BLOCK_NAMES.TURN, 2],
          [BLOCK_NAMES.PICK_UP, 1],
          [BLOCK_NAMES.DROP, 1],
          [BLOCK_NAMES.INCREMENT_VAR, 4],
          [BLOCK_NAMES.REPEAT, 1],
          [BLOCK_NAMES.END_REPEAT, 1],
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 100},
          {...d, id: 'rock1', object: OBJECTS.ROCK_RED, x: 200, elevation: -50, canCarry: true, color: 'red'},
          {...d, id: 'rock2', object: OBJECTS.ROCK_RED, x: 400, elevation: -50, canCarry: true, color: 'red'},
          {...d, id: 'rock3', object: OBJECTS.ROCK_RED, x: 600, elevation: -50, canCarry: true, color: 'red'},
          {...d, id: 'rock4', object: OBJECTS.ROCK_BLUE, x: 300, elevation: -50, canCarry: true, color: 'blue'},
          {...d, id: 'rock5', object: OBJECTS.ROCK_BLUE, x: 500, elevation: -50, canCarry: true, color: 'blue'},
          {...d, id: 'rock6', object: OBJECTS.ROCK_BLUE, x: 700, elevation: -50, canCarry: true, color: 'blue'},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 100},
        ],
        criteria: [
          {category: 'location_x', id: 'rock1', value: 100, message: 'Các mẫu đá chưa được thả ở chỗ tên lửa.'},
          {category: 'location_x', id: 'rock2', value: 100, message: 'Các mẫu đá chưa được thả ở chỗ tên lửa.'},
          {category: 'location_x', id: 'rock3', value: 100, message: 'Các mẫu đá chưa được thả ở chỗ tên lửa.'},
          {category: 'location_x', id: 'rock4', value: 300, message: 'Một viên đá xanh đã bị di chuyển.'},
          {category: 'location_x', id: 'rock5', value: 500, message: 'Một viên đá xanh đã bị di chuyển.'},
          {category: 'location_x', id: 'rock6', value: 700, message: 'Một viên đá xanh đã bị di chuyển.'},
        ]
      },
      {
        objective: 'Xong việc ở Sao Hỏa! Hãy phóng tên lửa để về nhà.',
        blocks: [
          [BLOCK_NAMES.LAUNCH_ROCKET, 1]
        ],
        items: [
          {...d, id: 'rocket', object: OBJECTS.ROCKET, x: 400},
          {...d, id: 'rover', object: OBJECTS.ROVER, x: 400},
        ],
        criteria: [
          {category: 'event', value: EVENTS.ROCKET_LAUNCH, message: 'Tên lửa chưa được phóng.'}
        ]
      } 
    ]
  },
]
import { JSX } from "solid-js";

// export interface SafariProps extends JSX.IntrinsicElements["svg"] {
//   url?: string;
//   src?: string;
//   width?: number;
//   height?: number;
// }
export interface SafariProps {
  url?: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Safari({
  src,
  url,
  width = 1203,
  height = 753,
  ...props
}: SafariProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#path0)">
        <path
          d="M0 52H1202V741C1202 747.627 1196.63 753 1190 753H12C5.37258 753 0 747.627 0 741V52Z"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 12C0 5.37258 5.37258 0 12 0H1190C1196.63 0 1202 5.37258 1202 12V52H0L0 12Z"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.06738 12C1.06738 5.92487 5.99225 1 12.0674 1H1189.93C1196.01 1 1200.93 5.92487 1200.93 12V51H1.06738V12Z"
          class="fill-white dark:fill-[#262626]"
        />
        <circle
          cx="27"
          cy="25"
          r="6"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <circle
          cx="47"
          cy="25"
          r="6"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <circle
          cx="67"
          cy="25"
          r="6"
          class="fill-[#E5E5E5] dark:fill-[#404040]"
        />
        <path
          d="M286 17C286 13.6863 288.686 11 292 11H946C949.314 11 952 13.6863 952 17V35C952 38.3137 949.314 41 946 41H292C288.686 41 286 38.3137 286 35V17Z"
          fill="#F5F5F5"
        />
        <g class="mix-blend-luminosity">
          <path
            d="M566.269 32.0852H572.426C573.277 32.0852 573.696 31.6663 573.696 30.7395V25.9851C573.696 25.1472 573.353 24.7219 572.642 24.6521V23.0842C572.642 20.6721 571.036 19.5105 569.348 19.5105C567.659 19.5105 566.053 20.6721 566.053 23.0842V24.6711C565.393 24.7727 565 25.1917 565 25.9851V30.7395C565 31.6663 565.418 32.0852 566.269 32.0852ZM567.272 22.97C567.272 21.491 568.211 20.6785 569.348 20.6785C570.478 20.6785 571.423 21.491 571.423 22.97V24.6394L567.272 24.6458V22.97Z"
            fill="#A3A3A3"
          />
        </g>
        <g class="mix-blend-luminosity">
          <text
            x="580"
            y="30"
            fill="#A3A3A3"
            font-size="12"
            font-family="Arial, sans-serif"
          >
            {url}
          </text>
        </g>
        {/* Additional SVG content */}
      </g>
    </svg>
  );
}

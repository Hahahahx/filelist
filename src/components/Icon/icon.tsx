import { Component, JSX } from 'solid-js'
import './icon.css'

interface Icon {
  className?: string
  size?: number
  color?: string
  rotate?: number
  spin?: 'left' | 'right' | 'none' | true
}

export const SvgIcon: Component<
  Icon & {
    path: JSX.Element
  }
> = (props) => {
  return (
    <svg
      className={`inline ${props.className}  ${
        props.spin ? 'animate-spin' : ''
      }`}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1667"
      style={{
        transition: 'transform 0.3s linear',
        transform: `rotate(${props.rotate || 0}deg)`,
        fill: props.color || 'currentColor',
      }}
      width={props.size || 20}
      height={props.size || 20}
    >
      {props.path}
    </svg>
  )
}

export const Arrow: Component<Icon> = (props) => {
  return (
    <SvgIcon
      {...props}
      path={
        <path
          d="M466.8 353.3L150 670.7l45.3 45.3L512 398.7 828.8 716l45.2-45.3-316.7-317.4-24-24L512 308l-15.7 15.8-29.5 29.5z"
          p-id="1668"
        ></path>
      }
    />
  )
}

export const Loadding: Component<Icon> = (props) => {
  return (
    <SvgIcon
      {...props}
      path={
        <path d="M379.733333 827.733333l68.266667-68.266666c21.333333 4.266667 42.666667 8.533333 68.266667 8.533333 140.8 0 256-115.2 256-256 0-21.333333-4.266667-46.933333-8.533334-68.266667l68.266667-68.266666c17.066667 42.666667 25.6 85.333333 25.6 132.266666 0 187.733333-153.6 341.333333-341.333333 341.333334-51.2 4.266667-98.133333-4.266667-136.533334-21.333334z m-183.466666-183.466666c-17.066667-42.666667-25.6-85.333333-25.6-132.266667 0-187.733333 153.6-341.333333 341.333333-341.333333 46.933333 0 93.866667 8.533333 132.266667 25.6l-68.266667 68.266666c-17.066667-4.266667-42.666667-8.533333-64-8.533333-140.8 0-256 115.2-256 256 0 21.333333 4.266667 46.933333 8.533333 68.266667l-68.266666 64z"></path>
      }
    />
  )
}

export const User: Component<Icon> = (props) => {
  return (
    <SvgIcon
      {...props}
      path={
        <path d="M512 62.08A449.92 449.92 0 1 0 961.92 512 449.92 449.92 0 0 0 512 62.08z m0 135.04a135.04 135.04 0 1 1-135.04 135.04A134.72 134.72 0 0 1 512 197.12z m0 640a323.84 323.84 0 0 1-269.76-144.96c0-89.6 179.84-138.56 269.76-138.56s268.48 48.96 269.76 138.56A323.84 323.84 0 0 1 512 835.84z" />
      }
    />
  )
}

export const Floder: Component<Icon> = (props) => {
  return (
    <SvgIcon
      {...props}
      path={
        <>
          <path d="M576 268.8h313.6c12.8 0 19.2-12.8 19.2-25.6v-76.8c0-12.8-6.4-25.6-19.2-25.6H518.4c-19.2 0-25.6 25.6-12.8 38.4l57.6 83.2c0 6.4 6.4 6.4 12.8 6.4z" />
          <path d="M902.4 320H576c-12.8 0-32-6.4-38.4-25.6L409.6 128c-12.8-12.8-25.6-19.2-44.8-19.2H128c-32 0-57.6 32-57.6 64V800c0 38.4 25.6 64 57.6 64h774.4c32 0 57.6-32 57.6-64V384c0-38.4-25.6-64-57.6-64zM633.6 672c0 19.2-12.8 32-32 32H204.8c-19.2 0-32-12.8-32-32s12.8-32 32-32H608c12.8 0 25.6 12.8 25.6 32z m166.4 0c0 19.2-12.8 32-32 32h-25.6c-19.2 0-32-12.8-32-32s12.8-32 32-32H768c19.2 0 32 12.8 32 32z" />
        </>
      }
    />
  )
}

export const File: Component<Icon> = (props) => {
  return (
    <SvgIcon
      {...props}
      path={
        <path d="M815.104 69.632q27.648 25.6 44.032 42.496t25.088 28.672 10.752 19.968 2.048 14.336l0 16.384-151.552 0q-10.24 0-17.92-7.68t-12.8-17.92-7.68-20.992-2.56-16.896l0-126.976 3.072 0q8.192 0 16.896 2.56t19.968 9.728 28.16 20.48 42.496 35.84zM640 129.024q0 20.48 6.144 42.496t19.456 40.96 33.792 31.232 48.128 12.288l149.504 0 0 577.536q0 29.696-11.776 53.248t-31.232 39.936-43.008 25.6-46.08 9.216l-503.808 0q-19.456 0-42.496-11.264t-43.008-29.696-33.28-41.984-13.312-49.152l0-696.32q0-21.504 9.728-44.544t26.624-42.496 38.4-32.256 45.056-12.8l391.168 0 0 128zM704.512 768q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-384 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l384 0zM768 448.512q0-26.624-18.432-45.568t-45.056-18.944l-384 0q-26.624 0-45.056 18.944t-18.432 45.568 18.432 45.056 45.056 18.432l384 0q26.624 0 45.056-18.432t18.432-45.056z" />
      }
    />
  )
}

export const Trash: Component<Icon> = (props) => {
  return (
    <SvgIcon
      {...props}
      path={
        <path d="M736.032 834.368C736.032 849.728 721.824 862.176 704.032 862.176 686.368 862.176 672.032 849.568 672.032 834.368L672.032 358.656C672.032 343.264 686.24 330.816 704.032 330.816 721.696 330.816 736.032 343.424 736.032 358.656L736.032 834.368ZM544.032 834.368C544.032 849.728 529.824 862.176 512.032 862.176 494.368 862.176 480.032 849.568 480.032 834.368L480.032 358.656C480.032 343.264 494.24 330.816 512.032 330.816 529.696 330.816 544.032 343.424 544.032 358.656L544.032 834.368ZM352.032 834.368C352.032 849.728 337.824 862.176 320.032 862.176 302.368 862.176 288.032 849.568 288.032 834.368L288.032 358.656C288.032 343.264 302.24 330.816 320.032 330.816 337.696 330.816 352.032 343.424 352.032 358.656L352.032 834.368ZM880.256 158.176 672 158.176 655.52 92.32C646.944 57.952 611.36 30.176 576.064 30.176L447.936 30.176C412.352 30.176 377.024 58.016 368.448 92.32L352 158.176 143.712 158.176C117.408 158.176 96 179.68 96 206.176 96 232.896 117.344 254.176 143.712 254.176L192.032 254.176 192.032 926.08C192.032 961.728 220.512 990.176 255.712 990.176L768.288 990.176C803.232 990.176 832.032 961.472 832.032 926.08L832.032 254.176 880.256 254.176C906.592 254.176 928 232.704 928 206.176 928 179.488 906.624 158.176 880.256 158.176" />
      }
    />
  )
}

export const FileEdit: Component<Icon> = (props) => {
  return (
    <SvgIcon
      {...props}
      path={
        <>
          <path d="M384.8192 785.6128c20.7872-25.8048 45.2608-49.4592 68.5056-73.1136 63.2832-64.4096 126.6688-128.9216 189.952-193.3312 59.0848-60.1088 118.1696-120.2176 177.152-180.3264 13.2096-13.4144 25.8048-29.7984 40.5504-41.472 15.36-12.0832 25.6-4.5056 37.5808 7.7824 10.5472 10.8544 20.7872 22.016 31.1296 32.9728 2.3552 2.56 15.9744 13.2096 15.9744 16.896 0 0-0.3072-258.4576-0.3072-258.4576 0-38.6048-31.4368-70.0416-70.0416-70.0416L135.7824 26.5216c-38.6048 0-70.0416 31.4368-70.0416 70.0416l0 812.6464c0 38.6048 31.4368 70.0416 70.0416 70.0416l183.7056 0.9216 36.4544-136.704C356.0448 843.4688 364.544 810.8032 384.8192 785.6128zM461.2096 432.2304 207.36 432.2304c-11.9808 0-21.7088-9.728-21.7088-21.7088 0-11.9808 9.728-21.7088 21.7088-21.7088l253.8496 0c11.9808 0 21.7088 9.728 21.7088 21.7088C483.0208 422.5024 473.1904 432.2304 461.2096 432.2304zM637.952 317.6448 207.36 317.6448c-11.9808 0-21.7088-9.728-21.7088-21.7088 0-11.9808 9.728-21.7088 21.7088-21.7088L637.952 274.2272c11.9808 0 21.7088 9.728 21.7088 21.7088C659.6608 307.9168 649.9328 317.6448 637.952 317.6448zM758.1696 202.9568 207.36 202.9568c-11.9808 0-21.7088-9.728-21.7088-21.7088 0-11.9808 9.728-21.7088 21.7088-21.7088l550.8096 0c11.9808 0 21.7088 9.728 21.7088 21.7088C779.8784 193.2288 770.1504 202.9568 758.1696 202.9568z" />
          <path d="M992.5632 501.4528 891.4944 400.384c-10.752-10.752-29.5936-10.752-40.3456 0L428.2368 823.0912c-1.7408 1.7408-3.072 3.9936-3.6864 6.3488l-42.2912 151.6544c-1.3312 4.8128-0.1024 10.0352 3.2768 13.7216 2.7648 2.9696 6.656 4.7104 10.6496 4.7104 0.9216 0 1.7408-0.1024 2.6624-0.2048L562.176 968.704c2.8672-0.512 5.5296-1.9456 7.5776-3.9936l422.912-422.8096C1003.7248 530.7392 1003.7248 512.6144 992.5632 501.4528zM927.1296 585.3184c-5.4272 5.4272-13.9264 5.7344-19.0464 0.6144l-100.864-100.864c-5.12-5.12-4.8128-13.6192 0.6144-19.0464 5.4272-5.4272 14.0288-5.7344 19.0464-0.6144l100.864 100.864C932.864 571.2896 932.5568 579.8912 927.1296 585.3184z" />
        </>
      }
    />
  )
}

export const Edit: Component<Icon> = (props) => {
  return (
    <SvgIcon
      {...props}
      path={
        <path d="M815.8 318.8L705.9 209c-19.5-19.5-19.5-51.2 0-70.7l59.7-59.7c19.5-19.5 51.2-19.5 70.7 0l109.8 109.8c19.5 19.5 19.5 51.2 0 70.7l-59.7 59.7c-19.5 19.6-51.1 19.6-70.6 0zM751.2 453.4c18.8-18.8 23.5-44.5 10.5-57.4L628.1 262.3c-12.9-12.9-38.6-8.2-57.4 10.5L81.3 749.2c-9.4 9.4-15.3 21.4-16.5 33.5l0.2 133.8c-2.4 25.2 17.4 45 42.6 42.6l133.8 1.1c12.1-1.2 24.2-7.1 33.5-16.5l476.3-490.3zM908.9 831.7H559.8c-13.4 0-26.2 5.3-35.6 14.8-17.1 17.2-45.3 46.3-68.8 70.7-15.2 15.8-4 42.1 17.9 42.1h435.3c28 0 50.9-22.9 50.9-50.9v-26.3c-0.2-27.7-22.8-50.4-50.6-50.4z" />
      }
    />
  )
}

package zsh.example.mycantest;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.app.Activity;
import android.text.method.ScrollingMovementMethod;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import imax.can.*;

public class MainActivity extends Activity {

	private Button can0Send;
	private Button can1Send;
	private Button startTest;
	private EditText can0SendText;
	private EditText can1SendText;
	private EditText can0RecvText;
	private EditText can1RecvText;
	private CanOperation can0Operatirn;
	private CanOperation can1Operatirn;
	private Spinner spinner;
	private ArrayAdapter adapter;
	static int bitrate;
	private static final int CAN0DATE = 0;
	private static final int CAN1DATE = 1;
	private MyHandler myHandler;
	private Rev revCan0;
	private Rev revCan1;
	boolean isContinueRevCan0;
	boolean isContinueRevCan1;
	// private Handler handler = new Handler() {
	// @Override
	// public void handleMessage(Message msg) {
	//
	// // TODO 接收消息并且去更新UI线程上的控件内容
	//
	// if (msg.what == CAN0DATE) {
	//
	// can0RecvText.setText(String.valueOf(msg.obj));
	// System.out.println("fckkckckckcckck");
	// }
	// else if (msg.what == CAN1DATE) {
	//
	// can1RecvText.setText(String.valueOf(msg.obj));
	// }
	//
	// super.handleMessage(msg);
	// }
	// };
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.set_can_bitrate);
		spinner = (Spinner) findViewById(R.id.Spinner);

		// 将可选内容与ArrayAdapter连接起来
		adapter = ArrayAdapter.createFromResource(this, R.array.plantes,
				android.R.layout.simple_spinner_item);

		// 设置下拉列表的风格
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

		// 将adapter2 添加到spinner中
		spinner.setAdapter(adapter);

		// 添加事件Spinner事件监听
		spinner.setOnItemSelectedListener(new SpinnerXMLSelectedListener());

		// 设置默认值
		spinner.setVisibility(View.VISIBLE);

		startTest = (Button) findViewById(R.id.startTest);

		this.bitrate = 250000;

		startTest.setOnClickListener(new startTestonClickListener());

	}

	// 使用XML形式操作
	class SpinnerXMLSelectedListener implements OnItemSelectedListener {

		public void onItemSelected(AdapterView<?> parent, View view,
				int position, long id) {
			String str = parent.getItemAtPosition(position).toString();
			String item = parent.getItemAtPosition(position).toString();
			System.out.println("item：" + item);
			if ("1000kbps".equals(item)) {
				bitrate = 1000000;
			} else if ("800kbps".equals(item)) {
				bitrate = 800000;
			} else if ("500kbps".equals(item)) {
				bitrate = 500000;
			} else if ("250kbps".equals(item)) {
				bitrate = 250000;
			} else if ("125kbps".equals(item)) {
				bitrate = 125000;
			} else if ("100kbps".equals(item)) {
				bitrate = 100000;
			} else if ("50kbps".equals(item)) {
				bitrate = 50000;
			} else if ("20kbps".equals(item)) {
				bitrate = 20000;
			} else if ("10kbps".equals(item)) {
				bitrate = 10000;
			} else if ("5kbps".equals(item)) {
				bitrate = 5000;
			}
		}

		public void onNothingSelected(AdapterView arg0) {

		}

	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;

	}
	class MyHandler extends Handler {
        public MyHandler() {
        }

        public MyHandler(Looper L) {
            super(L);
        }

        // 子类必须重写此方法,接受数据
        @Override
        public void handleMessage(Message msg) {
            // TODO Auto-generated method stub
//            Log.d("MyHandler", "handleMessage......");
            super.handleMessage(msg);
            // 此处可以更新UI
//            Bundle b = msg.getData();
//            String color = b.getString("color");
//            MyHandlerActivity.this.button.append(color);
        	 if (msg.what == CAN0DATE) {
	        	 System.out.println("CAN0DATE");
	        	 can0RecvText.append(String.valueOf(msg.obj));
        	 }
        	 else if (msg.what == CAN1DATE) {
	        	 System.out.println("CAN1DATE");
        		 can1RecvText.append(String.valueOf(msg.obj));
        	 }
        }
    }
	class can0SendOnClickListener implements OnClickListener {
		@Override
		public void onClick(View v) {
			// TODO Auto-generated method stub	
			if(isContinueRevCan0)
			{
				isContinueRevCan0 = false;	
				isContinueRevCan1 = false;	
//				try {
//					new Thread().sleep(1000);
//				} catch (InterruptedException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
			}
			if(!isContinueRevCan1)
			{
				isContinueRevCan1 = true;
				revCan1 = new Rev(CAN1DATE, can1Operatirn);
				revCan1.start();
			}
			String sendBuff = can0SendText.getText().toString();
			int dataLen = sendBuff.length();
			int frameLen = dataLen % 8 == 0 ? dataLen / 8 : dataLen / 8 + 1;
			new Send(dataLen, frameLen, can0Operatirn, sendBuff).run_send();
		}
	}
	class can1SendOnClickListener implements OnClickListener {
		@SuppressWarnings("deprecation")
		@Override
		public void onClick(View v) {
			if(isContinueRevCan1)
			{
				isContinueRevCan1 = false;	
				isContinueRevCan0 = false;	
//				try {
//					new Thread().sleep(1000);
//				} catch (InterruptedException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
			}
			if(!isContinueRevCan0)
			{
				isContinueRevCan0 = true;
				revCan0 = new Rev(CAN0DATE, can0Operatirn);
				revCan0.start();
			}
			String sendBuff = can1SendText.getText().toString();
			int dataLen = sendBuff.length();
			int frameLen = dataLen % 8 == 0 ? dataLen / 8 : dataLen / 8 + 1;
			new Send(dataLen, frameLen, can1Operatirn, sendBuff).run_send();

		}
	}
	class startTestonClickListener implements OnClickListener {
		@Override
		public void onClick(View v) {
			// TODO Auto-generated method stub
			setContentView(R.layout.activity_main);
			can0SendText = (EditText) findViewById(R.id.can0SendText);
			can1SendText = (EditText) findViewById(R.id.can1SendText);
			can0RecvText = (EditText) findViewById(R.id.can0Recvtext);
			can1RecvText = (EditText) findViewById(R.id.can1Recvtext);
			can0Send = (Button) findViewById(R.id.can0Send);
			can1Send = (Button) findViewById(R.id.can1Send);
			can0Send.setOnClickListener(new can0SendOnClickListener());
			can1Send.setOnClickListener(new can1SendOnClickListener());
			can0Operatirn = new CanOperation("can0", bitrate);
			can1Operatirn = new CanOperation("can1", bitrate);
			can0RecvText.setMovementMethod(ScrollingMovementMethod
					.getInstance());
			can0RecvText.setSelection(can0RecvText.getText().length(),
					can0RecvText.getText().length());
			can1RecvText.setMovementMethod(ScrollingMovementMethod
					.getInstance());
			can1RecvText.setSelection(can1RecvText.getText().length(),
					can1RecvText.getText().length());

			 myHandler = new MyHandler();
			 
			System.out.println("bitrate:" + bitrate);
			revCan0 = new Rev(CAN0DATE, can0Operatirn);
		    revCan1 = new Rev(CAN1DATE, can1Operatirn);	
			isContinueRevCan0 = false;
			isContinueRevCan1 = false;
		    
		}
	}



	class Rev extends Thread {
		private CanOperation canOperatirn;
		private int canType;
		private String revbuff;

		public Rev(int canType, CanOperation canOperatirn) {
			this.canOperatirn = canOperatirn;
			this.revbuff = "";
			this.canType = canType;
		}

		public void run() {
			System.out.println("接收CAN" + canType + "数据线程");
			CanNormalFrame buff[] = new CanNormalFrame[1];
			buff[0] = new CanNormalFrame();
			boolean isContinue = true;
			while (isContinue) {
				if(canType == CAN0DATE)
				{
					if(!isContinueRevCan0)
						return;
				}
				else if(canType == CAN1DATE)
				{
					if(!isContinueRevCan1)
						return; 
				}
				// 类数组没有创建对象将会返回-2
				//canOperatirn写成can0Operatirn。。。
				int recvLen = canOperatirn.CanOperationRead(buff, 1);
//				System.out.println("recvLen："+recvLen);
				if (recvLen > 0) {
					Message msg = new Message();
					msg.what = canType;
					System.out.println("接收数据次数:" + recvLen);
					msg.obj = buff[0].printfCanNormalFrame();
					System.out.println("buff[0].printfCanNormalFrame()"+buff[0].printfCanNormalFrame());
					myHandler.sendMessage(msg);
				}
			}
		}
	}

	class Send {

		private int dataLen;
		private int frameLen;
		private CanOperation canOperatirn;
		private String sendBuff;

		public Send(int dataLen, int frameLen, CanOperation canOperatirn,
				String sendBuff) {
			this.canOperatirn = canOperatirn;
			this.dataLen = dataLen;
			this.frameLen = frameLen;
			this.sendBuff = sendBuff;
		}

		public void run_send() {

			System.out.println("dataLen:" + dataLen);
			System.out.println("frameLen:" + frameLen);
			if (frameLen == 0)
				return;

			byte[] datainfo = new byte[frameLen * 8];
			datainfo = sendBuff.getBytes();
			short[] temp = new short[8];
			CanNormalFrame canNormalFrame = new CanNormalFrame();
			int i = 0;
			for (i = 0; i < dataLen; i++) {
				temp[i % 8] = datainfo[i];
				if ((i + 1) % 8 == 0 && i != 0) {
					System.out.println("iiiiiiiii" + i);
					canNormalFrame.setExtId(0x1ffff1ff);
					canNormalFrame.setStdId(0x11);
					canNormalFrame.setIDE((byte) 1);
					canNormalFrame.setRTR((byte) 0);
					canNormalFrame.setCan_DLC((byte) 8);
					canNormalFrame.setmData(temp);
					// = new CanNormalFrame(0x11, 0x1fffffff, (byte)1,(byte)
					// 0,(byte) 8, NULL);
					System.out.println("======发送数据字节数:"
							+ this.canOperatirn
									.CanOperationWrite(canNormalFrame));// )
				}
			}
			if (i % 8 != 0) {
				canNormalFrame.setExtId(0x1ffff1ff);
				canNormalFrame.setStdId(0x11);
				canNormalFrame.setIDE((byte) 1);
				canNormalFrame.setRTR((byte) 0);
				canNormalFrame.setCan_DLC((byte) (i % 8));
				canNormalFrame.setmData(temp);
				System.out.println("==========发送数据字节数:"
						+ this.canOperatirn.CanOperationWrite(canNormalFrame));
			}
		}
	}
}

package com.Service;

import org.junit.Test;
import sun.management.snmp.jvminstr.JvmOSImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;


public class test {


    @Test
    public void simpleMethod() {
        //    ThreadpoolService
        ThreadPoolExecutor poolExecutor = new ThreadPoolExecutor(9, 100, 100, TimeUnit.SECONDS, new SynchronousQueue<>());

        try {
            List<String> list1 = new ArrayList<String>();
            for (int i = 0; i <= 60; i++) {

//                poolExecutor.submit(()->{
//                    for (int j = 0; j <=20 ; j++) {
//                        list1.add("i:"+j);
//                    }
//
//                });

                Callable<Integer> call1 = new Callable<Integer>() {
                    @Override
                    public Integer call() throws Exception {
                        for (int j = 0; j < 10; j++) {
                            list1.add("i:" + j);
                        }
                        return 10;
                    }
                };
                Callable<Integer> call2 = new Callable<Integer>() {
                    @Override
                    public Integer call() throws Exception {
                        for (int j = 0; j < 10; j++) {
                            list1.add("i:" + j);
                        }
                        return 10;
                    }
                };
                Callable<Integer> call3 = new Callable<Integer>() {
                    @Override
                    public Integer call() throws Exception {
                        for (int j = 0; j < 10; j++) {
                            list1.add("i:" + j);
                        }
                        return 10;
                    }
                };

                Callable<Integer> call4 = new Callable<Integer>() {
                    @Override
                    public Integer call() throws Exception {
                        for (int j = 0; j < 10; j++) {
                            list1.add("i:" + j);
                        }
                        return 10;
                    }
                };
                Future<Integer> f1 = poolExecutor.submit(call1);

                Future<Integer> f2 = poolExecutor.submit(call2);
                Future<Integer> f3 = poolExecutor.submit(call3);
                Future<Integer> f4 = poolExecutor.submit(call3);
                ArrayList<String> ss = new ArrayList<>();

                f1.get();
                f2.get();
                f3.get();
                f4.get();


            }


//            wait(2000);

            // Thread.sleep(1000);
            System.out.println("list1.size() = " + list1.size());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    @Test
    public void tempMehtod2() {
        ConcurrentHashMap<String, Integer> hashMap = new ConcurrentHashMap<>();
        hashMap.put("key", 1);
        System.out.println("hashMap = " + hashMap);
    }


    public static void main(String[] args) {


        String s="liyanbo";
        System.out.println("s.intern() = " + s.intern());
    }

}

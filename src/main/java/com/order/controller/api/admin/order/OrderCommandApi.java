package com.order.controller.api.admin.order;

import com.order.controller.api.ExceptionHandlerApi;
import com.order.dto.OrderDTO;
import com.order.dto.ServiceResult;
import com.order.processor.order.OrderCommadProcessor;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/order")
public class OrderCommandApi extends ExceptionHandlerApi {
    private OrderCommadProcessor orderCommandProcessor;
    
    @PostMapping
    public ResponseEntity<ServiceResult> createByAdmin(@Valid @RequestBody OrderDTO orderDTO) {
        ServiceResult serviceResult = new ServiceResult();
        try {
            orderCommandProcessor.createByAdmin(orderDTO);
            serviceResult.setData(orderDTO);
            serviceResult.setMessage("Đặt thành công");
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    
    @PutMapping("/accept/{id}")
    public ResponseEntity<ServiceResult> acceptOrder(@PathVariable Long id) {
        ServiceResult serviceResult = new ServiceResult("Nhận đơn hàng thành công");
        try {
            orderCommandProcessor.acceptOrder(id);
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    
    @PutMapping("/accept")
    public ResponseEntity<ServiceResult> acceptOrder(@RequestBody OrderDTO orderDTO) {
        ServiceResult serviceResult = new ServiceResult("Nhận đơn hàng thành công");
        try {
            orderCommandProcessor.acceptOrder(orderDTO.getIds());
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    
    @PutMapping("/cancel/{id}")
    public ResponseEntity<ServiceResult> cancelOrder(@PathVariable Long id) {
        ServiceResult serviceResult = new ServiceResult("Hủy đơn thành công");
        try {
            orderCommandProcessor.cancelOrder(id);
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    
    @PutMapping("/cancel")
    public ResponseEntity<ServiceResult> cancelOrder(@RequestBody OrderDTO orderDTO) {
        ServiceResult serviceResult = new ServiceResult("Hủy đơn thành công");
        try {
            orderCommandProcessor.cancelOrder(orderDTO.getIds());
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    
    @PutMapping("/completed/{id}")
    public ResponseEntity<ServiceResult> updateCompleted(@PathVariable Long id) {
        ServiceResult serviceResult = new ServiceResult("Cập nhật đơn hàng thàng công");
        try {
            orderCommandProcessor.updateCompleted(id);
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
    @PutMapping("/completed")
    public ResponseEntity<ServiceResult> updateCompleted(@RequestBody OrderDTO orderDTO) {
        ServiceResult serviceResult = new ServiceResult("Cập nhật danh sách đơn hàng thàng công");
        try {
            orderCommandProcessor.updateCompleted(orderDTO.getIds());
        } catch (Exception e) {
            serviceResult.setMessage(e.getMessage());
            return new ResponseEntity<>(serviceResult, HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(serviceResult);
    }
}
